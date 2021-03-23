import { MarkDownRenderer } from "./MarkDownRenderer";
import { MarkDownRendered } from "..";

export class MarkDownSpacerRenderer extends MarkDownRenderer {
  static type: "spacer" = "spacer";

  constructor(contents: string) {
    super(contents);
  }

  render(): MarkDownRendered {
    return {
      type: MarkDownSpacerRenderer.type,
      height: 2,
    };
  }
}
