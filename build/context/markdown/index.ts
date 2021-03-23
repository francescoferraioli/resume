import * as fs from "fs";
import { last } from "lodash";
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

export type MarkDownLine = MarkDownText | MarkDownInstruction;

interface MarkDownText {
  lineNumber: number;
  type: "text";
  line: string;
}

const markdownFolder = "src/md/";

const buildMarkdownForFile = (
  name: string
): Record<string, MarkDownRendered[]> => ({
  [name.replace(".md", "")]: parseMarkdownFile(`${markdownFolder}${name}`),
});

const parseMarkdownFile = (file: string): MarkDownRendered[] =>
  parseMarkdownLines(fs.readFileSync(file, "utf-8").split("\n"));

const parseMarkdownLines = (lines: string[]): MarkDownRendered[] => {
  const blockRendererStack: MarkDownRenderer[] = [];
  const rendered = lines
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
    return parseInstruction(line, lineNumber);
  }

  return {
    lineNumber,
    type: "text",
    line,
  };
};

const renderLines = (blockRendererStack: MarkDownRenderer[]) => (
  acc: MarkDownRendered[],
  line: MarkDownLine
): MarkDownRendered[] => {
  switch (line.type) {
    case "text":
      return renderText(blockRendererStack)(acc, line.line);
    case "instruction":
      return renderInstruction(blockRendererStack)(acc, line);
    default:
      assertUnreachable(line);
  }
};

const renderText = (blockRendererStack: MarkDownRenderer[]) => (
  acc: MarkDownRendered[],
  line: string
): MarkDownRendered[] => {
  const currentRenderer = last(blockRendererStack);
  if (currentRenderer) {
    currentRenderer.addContent(line);
    return acc;
  }
  return [...acc, getRendererForText(line).render()];
};

const renderInstruction = (blockRendererStack: MarkDownRenderer[]) => (
  acc: MarkDownRendered[],
  line: MarkDownInstruction
): MarkDownRendered[] => {
  const currentRenderer = last(blockRendererStack);
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
};

export const markdown: Record<string, MarkDownRendered[]> = fs
  .readdirSync(markdownFolder)
  .map(buildMarkdownForFile)
  .reduce(Object.assign, {});
