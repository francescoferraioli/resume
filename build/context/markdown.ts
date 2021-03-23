import * as fs from "fs";

const markdownFolder = "src/md/";

import * as md from "markdown-it";
import { assertUnreachable } from "../utils";

const parseMarkdownFile = (lines: string[]): MarkDownLine[] => {
  const parseMarkdownLine = (line: string): MarkDownLine => {
    if (line.trim() === "") {
      return createLineBreak(2);
    }

    if (line.trim().startsWith("<")) {
      return createHtml(line);
    }

    return createMarkDown(line);
  };

  return lines.map(parseMarkdownLine);
};

const reduceMarkDownLines = (
  acc: MarkDownLine[],
  line: MarkDownLine
): MarkDownLine[] => {
  const last = acc[acc.length - 1];
  switch (line.type) {
    case "markdown":
    case "line-break":
      return [...acc, line];
    case "html": {
      if (last?.type === "html") {
        last.html += line.html;
        return acc;
      }
      return [...acc, line];
    }
    default:
      assertUnreachable(line);
  }
};

const createMarkDown = (line: string): MarkDownStandard => ({
  type: "markdown",
  markdown: md().render(line).trimEnd(),
});

const createHtml = (line: string): MarkDownHtml => ({
  type: "html",
  html: line,
});

const createLineBreak = (height: number): MarkDownLineBreak => ({
  type: "line-break",
  height,
});

export type MarkDownLine = MarkDownStandard | MarkDownHtml | MarkDownLineBreak;

interface MarkDownStandard {
  type: "markdown";
  markdown: string;
}

interface MarkDownHtml {
  type: "html";
  html: string;
}

interface MarkDownLineBreak {
  type: "line-break";
  height: number;
}

const buildMarkdownForFile = (
  name: string
): Record<string, MarkDownLine[]> => ({
  [name.replace(".md", "")]: parseMarkdownFile(
    fs.readFileSync(`${markdownFolder}${name}`, "utf-8").split("\n")
  ).reduce(reduceMarkDownLines, []),
});

export const markdown: Record<string, MarkDownLine[]> = fs
  .readdirSync(markdownFolder)
  .map(buildMarkdownForFile)
  .reduce(Object.assign, {});
