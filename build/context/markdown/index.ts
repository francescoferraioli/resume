import * as fs from "fs";
import { parseMarkdownFile } from "./parsers";
import { MarkDownRendered } from "./renderers";

const markdownFolder = "src/md/";

const buildMarkdownForFile = (
  name: string
): Record<string, MarkDownRendered[]> => ({
  [name.replace(".md", "")]: parseMarkdownFile(`${markdownFolder}${name}`),
});

export const markdown: Record<string, MarkDownRendered[]> = fs
  .readdirSync(markdownFolder)
  .filter((name) => name !== "README.md")
  .map(buildMarkdownForFile)
  .reduce(Object.assign, {});
