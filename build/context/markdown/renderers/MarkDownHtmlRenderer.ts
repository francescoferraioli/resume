import { MarkDownRenderer } from "./MarkDownRenderer";
import { MarkDownRendered } from ".";

export interface MarkDownHtml {
  type: "html";
  html: string;
}

export class MarkDownHtmlRenderer extends MarkDownRenderer {
  static type: MarkDownHtml["type"] = "html";

  constructor(contents: string) {
    super(contents);
  }

  render(): MarkDownRendered {
    return {
      type: MarkDownHtmlRenderer.type,
      html: this.contents,
    };
  }
}
