import { MarkDownRenderer } from "./MarkDownRenderer";
import { MarkDownRendered } from ".";

export interface MarkDownSpacer {
  type: "spacer";
  height: number;
}

export class MarkDownSpacerRenderer extends MarkDownRenderer {
  static type: MarkDownSpacer["type"] = "spacer";

  constructor(content?: string) {
    super(content);
  }

  render(): MarkDownRendered {
    return {
      className: this.className,
      type: MarkDownSpacerRenderer.type,
      height: 1,
    };
  }
}
