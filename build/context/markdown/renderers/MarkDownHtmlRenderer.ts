import { MarkDownRenderer } from "./MarkDownRenderer";
import { MarkDownRendered } from "..";

export class MarkDownHtmlRenderer extends MarkDownRenderer {
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
