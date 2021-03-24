import { MarkDownRenderer } from "./MarkDownRenderer";
import { MarkDownRendered } from ".";
import { parseMarkdownLines } from "../parsers";

export interface MarkDownColumn {
  type: "column";
  columns: MarkDownRendered[];
}

export class MarkDownColumnRenderer extends MarkDownRenderer {
  static type: MarkDownColumn["type"] = "column";

  constructor(content?: string) {
    super(content);
  }

  render(): MarkDownRendered {
    return {
      type: MarkDownColumnRenderer.type,
      columns: parseMarkdownLines(this.contents),
    };
  }
}
