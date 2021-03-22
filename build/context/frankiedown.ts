import * as md from "markdown-it";
import { assertUnreachable } from "../utils";

export const parseMarkdownFile = (line: string): FrankieDownLine => {
  if (line.trim() === "") {
    return createLineBreak(2);
  }

  if (line.trim().startsWith("<")) {
    return createHtml(line);
  }

  return createMarkDown(md().render(line).trimEnd());
};

export const reduceFrankieDownLines = (
  acc: FrankieDownLine[],
  line: FrankieDownLine
): FrankieDownLine[] => {
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

const createMarkDown = (markdown: string): FrankieDownMarkDown => ({
  type: "markdown",
  markdown,
});

const createHtml = (html: string): FrankieDownHtml => ({
  type: "html",
  html,
});

const createLineBreak = (height: number): FrankieDownLineBreak => ({
  type: "line-break",
  height,
});

export type FrankieDownLine =
  | FrankieDownMarkDown
  | FrankieDownHtml
  | FrankieDownLineBreak;

interface FrankieDownMarkDown {
  type: "markdown";
  markdown: string;
}

interface FrankieDownHtml {
  type: "html";
  html: string;
}

interface FrankieDownLineBreak {
  type: "line-break";
  height: number;
}
