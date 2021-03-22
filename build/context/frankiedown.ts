import * as md from "markdown-it";

export const parseMarkdownFile = (line: string): FrankieDownLine => {
  if (line.trim() === "") {
    return createLineBreak(2);
  }

  if (line.trim().startsWith("<")) {
    return createHtml(line);
  }

  return createMarkDown(md().render(line).trimEnd());
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
