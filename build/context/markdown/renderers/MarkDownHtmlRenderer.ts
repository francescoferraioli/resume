import { MarkDownRenderer } from "./MarkDownRenderer";
import { MarkDownRendered } from ".";

export interface MarkDownHtml {
  type: "html";
  html: string;
}

export class MarkDownHtmlRenderer extends MarkDownRenderer {
  static type: MarkDownHtml["type"] = "html";

  constructor(content?: string) {
    super(content);
  }

  render(): MarkDownRendered {
    return {
      className: this.className,
      type: MarkDownHtmlRenderer.type,
      html: this.content,
    };
  }
}
