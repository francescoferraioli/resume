import * as fs from "fs";
import { assertUnreachable } from "../../utils";
import {
  isInstruction,
  MarkDownInstruction,
  parseInstruction,
} from "./instructions";
import { getRendererForText } from "./renderers";

const markdownFolder = "src/md/";

const mapToMarkDownLine = (line: string): MarkDownLine => {
  if (isInstruction(line)) {
    return parseInstruction(line);
  }

  return {
    type: "text",
    line,
  };
};

const parseMarkdownFile = (file: string): MarkDownRendered[] => {
  return fs
    .readFileSync(file, "utf-8")
    .split("\n")
    .map(mapToMarkDownLine)
    .reduce((acc, line) => {
      switch (line.type) {
        case "text":
          return [...acc, getRendererForText(line.line).render()];
        case "instruction": {
          return acc;
        }
        default:
          assertUnreachable(line);
      }
    }, []);
};

export type MarkDownRendered = MarkDownStandard | MarkDownHtml | MarkDownSpacer;

interface MarkDownStandard {
  type: "standard";
  markdown: string;
}

interface MarkDownHtml {
  type: "html";
  html: string;
}

interface MarkDownSpacer {
  type: "spacer";
  height: number;
}

export type MarkDownLine = MarkDownText | MarkDownInstruction;

interface MarkDownText {
  type: "text";
  line: string;
}

const buildMarkdownForFile = (
  name: string
): Record<string, MarkDownRendered[]> => ({
  [name.replace(".md", "")]: parseMarkdownFile(`${markdownFolder}${name}`),
});

export const markdown: Record<string, MarkDownRendered[]> = fs
  .readdirSync(markdownFolder)
  .map(buildMarkdownForFile)
  .reduce(Object.assign, {});
