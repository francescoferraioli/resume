import * as md from "markdown-it";
import { MarkDownRenderer } from "./MarkDownRenderer";
import { MarkDownRendered } from "..";

export class MarkDownStandardRenderer extends MarkDownRenderer {
  static type: "standard" = "standard";

  constructor(contents: string) {
    super(contents);
  }

  render(): MarkDownRendered {
    return {
      type: MarkDownStandardRenderer.type,
      markdown: new md().render(this.contents).trimEnd(),
    };
  }
}
