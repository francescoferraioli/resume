import * as fs from "fs";
import * as md from "markdown-it";

const markdownFolder = "src/md/";

const parseMarkdownFile = (name: string): Record<string, string[]> => ({
  [name.replace(".md", "")]: fs
    .readFileSync(`${markdownFolder}${name}`, "utf-8")
    .split("\n")
    .map((x) => (x.startsWith("<") ? x : md().render(x)))
    .map((x) => x.trimEnd()),
});

export const markdown: Record<string, string[]> = fs
  .readdirSync(markdownFolder)
  .map(parseMarkdownFile)
  .reduce(Object.assign, {});
