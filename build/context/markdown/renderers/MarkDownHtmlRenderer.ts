import { MarkDownRenderer } from "./MarkDownRenderer";
import { MarkDownRendered } from "..";

export class MarkDownHtmlRenderer extends MarkDownRenderer {
  static type: "html" = "html";

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
