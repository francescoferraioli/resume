import * as fs from "fs";
import * as md from "markdown-it";
import { assertUnreachable } from "../../utils";

abstract class MarkDownRenderer {
  constructor(protected contents: string) {}

  abstract render(): MarkDownRendered;
}

class MarkDownStandardRenderer extends MarkDownRenderer {
  constructor(contents: string) {
    super(contents);
  }

  render(): MarkDownRendered {
    return {
      type: "standard",
      markdown: new md().render(this.contents).trimEnd(),
    };
  }
}

class MarkDownHtmlRenderer extends MarkDownRenderer {
  constructor(contents: string) {
    super(contents);
  }

  render(): MarkDownRendered {
    return {
      type: "html",
      html: this.contents,
    };
  }
}

class MarkDownSpacerRenderer extends MarkDownRenderer {
  constructor(contents: string) {
    super(contents);
  }

  render(): MarkDownRendered {
    return {
      type: "spacer",
      height: 2,
    };
  }
}

const markdownFolder = "src/md/";

const mdInstructions: Record<
  string,
  MarkDownInstruction["instruction"]["instruction"]
> = {
  startBlock: "start-block",
  endBlock: "end-block",
};

const parseMdInstuction = (
  type: string,
  rest: string
): MarkDownInstruction["instruction"] => {
  switch (type) {
    case mdInstructions.startBlock:
    case mdInstructions.endBlock:
      return {
        instruction: type,
        renderer: rest,
      };
    default:
      throw new Error(`Unsupported instruction type: ${type}`);
  }
};

const mapToMarkDownLine = (line: string): MarkDownLine => {
  if (line.startsWith("md:")) {
    const [, type, rest] = line.split(":");
    return {
      type: "instruction",
      instruction: parseMdInstuction(type, rest),
    };
  }

  return {
    type: "text",
    line,
  };
};

const parseMarkdownFile = (lines: string[]): MarkDownRendered[] => {
  return lines.map(mapToMarkDownLine).reduce((acc, line) => {
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

const getRendererForText = (text: string): MarkDownRenderer => {
  if (text.trim() === "") {
    return new MarkDownSpacerRenderer(text);
  }

  if (text.trim().startsWith("<")) {
    return new MarkDownHtmlRenderer(text);
  }

  return new MarkDownStandardRenderer(text);
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

export type MarkDownInstruction = {
  type: "instruction";
  instruction: MarkDownStartBlock | MarkDownEndBlock;
};

interface MarkDownText {
  type: "text";
  line: string;
}

interface MarkDownStartBlock {
  instruction: "start-block";
  renderer: string;
}

interface MarkDownEndBlock {
  instruction: "end-block";
  renderer: string;
}

const buildMarkdownForFile = (
  name: string
): Record<string, MarkDownRendered[]> => ({
  [name.replace(".md", "")]: parseMarkdownFile(
    fs.readFileSync(`${markdownFolder}${name}`, "utf-8").split("\n")
  ),
});

export const markdown: Record<string, MarkDownRendered[]> = fs
  .readdirSync(markdownFolder)
  .map(buildMarkdownForFile)
  .reduce(Object.assign, {});
