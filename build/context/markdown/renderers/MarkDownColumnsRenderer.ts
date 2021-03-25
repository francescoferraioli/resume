import { MarkDownRenderer } from "./MarkDownRenderer";
import { MarkDownRendered } from ".";
import { parseMarkdownLines } from "../parsers";

export interface MarkDownColumns {
  type: "columns";
  columns: MarkDownRendered[];
}

export class MarkDownColumnsRenderer extends MarkDownRenderer {
  static type: MarkDownColumns["type"] = "columns";

  constructor(content?: string) {
    super(content);
  }

  render(): MarkDownRendered {
    return {
      className: this.className,
      type: MarkDownColumnsRenderer.type,
      columns: parseMarkdownLines(this.contents),
    };
  }
}
