import { MarkDownRenderer } from "./MarkDownRenderer";
import { MarkDownRendered } from ".";

export interface MarkDownSpacer {
  type: "spacer";
  height: number;
}

export class MarkDownSpacerRenderer extends MarkDownRenderer {
  static type: MarkDownSpacer["type"] = "spacer";

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
