import * as fs from "fs";
import { assertUnreachable } from "../../utils";
import {
  isInstruction,
  MarkDownInstruction,
  parseInstruction,
} from "./instructions";
import {
  getRendererForText,
  getRendererFromType,
  getRendererType,
  MarkDownRendered,
} from "./renderers";
import { MarkDownRenderer } from "./renderers/MarkDownRenderer";

export type MarkDownLine = (MarkDownText | MarkDownInstruction) & {
  lineNumber: number;
};

interface MarkDownText {
  type: "text";
  line: string;
}

const markdownFolder = "src/md/";

const buildMarkdownForFile = (
  name: string
): Record<string, MarkDownRendered[]> => ({
  [name.replace(".md", "")]: parseMarkdownFile(`${markdownFolder}${name}`),
});

const parseMarkdownFile = (file: string): MarkDownRendered[] => {
  const blockRendererStack: MarkDownRenderer[] = [];
  const rendered = fs
    .readFileSync(file, "utf-8")
    .split("\n")
    .map(mapToMarkDownLine)
    .reduce(renderLines(blockRendererStack), []);

  if (blockRendererStack.length > 0) {
    throw new Error(
      `Found start-block(s) without a matching end-block(s): ${blockRendererStack.map(
        getRendererType
      )}`
    );
  }

  return rendered;
};

const mapToMarkDownLine = (line: string, index: number): MarkDownLine => {
  const lineNumber = index + 1;
  if (isInstruction(line)) {
    return {
      ...parseInstruction(line, lineNumber),
      lineNumber,
    };
  }

  return {
    type: "text",
    line,
    lineNumber,
  };
};

const renderLines = (blockRendererStack: MarkDownRenderer[]) => (
  acc: MarkDownRendered[],
  line: MarkDownLine
): MarkDownRendered[] => {
  const currentRenderer = blockRendererStack[blockRendererStack.length - 1];
  switch (line.type) {
    case "text":
      if (currentRenderer) {
        currentRenderer.addContent(line.line);
        return acc;
      }
      return [...acc, getRendererForText(line.line).render()];
    case "instruction": {
      switch (line.instruction.instruction) {
        case "start-block": {
          blockRendererStack.push(
            getRendererFromType(line.instruction.renderer, line.lineNumber)
          );
          return acc;
        }
        case "end-block": {
          if (currentRenderer === undefined) {
            throw new Error(
              `Found end-block without a matching start-block. #${line.lineNumber}`
            );
          }
          const currentRendererType = getRendererType(currentRenderer);
          if (currentRendererType !== line.instruction.renderer) {
            throw new Error(
              `Found end-block for renderer '${line.instruction.renderer}' but was expecing end-block for renderer '${currentRendererType}'. #${line.lineNumber}`
            );
          }
          blockRendererStack.pop();
          return [...acc, currentRenderer.render()];
        }
      }
    }
    default:
      assertUnreachable(line);
  }
};

export const markdown: Record<string, MarkDownRendered[]> = fs
  .readdirSync(markdownFolder)
  .map(buildMarkdownForFile)
  .reduce(Object.assign, {});
