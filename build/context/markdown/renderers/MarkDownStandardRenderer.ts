import * as md from "markdown-it";
import { MarkDownRenderer } from "./MarkDownRenderer";
import { MarkDownRendered } from ".";

export interface MarkDownStandard {
  type: "standard";
  markdown: string;
  className?: string;
}

export class MarkDownStandardRenderer extends MarkDownRenderer {
  static type: MarkDownStandard["type"] = "standard";

  constructor(content?: string) {
    super(content);
  }

  render(): MarkDownRendered {
    return {
      className: this.className,
      type: MarkDownStandardRenderer.type,
      markdown: new md().render(this.content).trimEnd(),
    };
  }
}
