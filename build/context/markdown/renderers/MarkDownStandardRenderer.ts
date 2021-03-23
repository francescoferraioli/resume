import * as md from "markdown-it";
import { MarkDownRenderer } from "./MarkDownRenderer";
import { MarkDownRendered } from "..";

export class MarkDownStandardRenderer extends MarkDownRenderer {
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
