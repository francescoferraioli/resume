import { MarkDownRenderer } from "./MarkDownRenderer";
import { MarkDownRendered } from "..";

export class MarkDownSpacerRenderer extends MarkDownRenderer {
  constructor(contents: string) {
    super(contents);
  }

  render(): MarkDownRendered {
    return {
      type: "spacer",
      height: 2,
    };
  }
}
