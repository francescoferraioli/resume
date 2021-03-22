import * as fs from "fs";
import { FrankieDownLine, parseMarkdownFile } from "./frankiedown";

const markdownFolder = "src/md/";

const buildMarkdownForFile = (
  name: string
): Record<string, FrankieDownLine[]> => ({
  [name.replace(".fd.md", "")]: fs
    .readFileSync(`${markdownFolder}${name}`, "utf-8")
    .split("\n")
    .map(parseMarkdownFile),
});

export const markdown: Record<string, FrankieDownLine[]> = fs
  .readdirSync(markdownFolder)
  .map(buildMarkdownForFile)
  .reduce(Object.assign, {});
