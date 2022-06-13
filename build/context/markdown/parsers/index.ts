import * as fs from "fs";
import {
  isInstruction,
  MarkDownInstruction,
  parseInstruction,
} from "../instructions";
import { getRendererType, MarkDownRendered, renderLines } from "../renderers";
import { MarkDownRenderer } from "../renderers/MarkDownRenderer";

export type MarkDownLine = MarkDownText | MarkDownInstruction;

interface MarkDownText {
  lineNumber: number;
  type: "text";
  line: string;
}

export const parseMarkdownFile = (file: string): MarkDownRendered[] =>
  parseMarkdownLines(
    fs.readFileSync(file, "utf-8").split("\n").map(removeCarriageReturn).filter(isNotComment)
  );

const removeCarriageReturn = (line: string) => line.replace("\r", "");

const isNotComment = (line: string) => !line.startsWith("!#");

export const parseMarkdownLines = (lines: string[]): MarkDownRendered[] => {
  const blockRendererStack: MarkDownRenderer[] = [];
  const rendered = lines
    .map(parseToMarkDownLine)
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

const parseToMarkDownLine = (line: string, index: number): MarkDownLine => {
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
