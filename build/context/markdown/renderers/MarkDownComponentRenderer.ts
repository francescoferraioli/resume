import { MarkDownRenderer } from "./MarkDownRenderer";
import { MarkDownRendered } from ".";

export interface MarkDownComponent {
  type: "component";
  name: string;
  props: any;
  skipContentClass: boolean | undefined;
}

export class MarkDownComponentRenderer extends MarkDownRenderer {
  static type: MarkDownComponent["type"] = "component";

  constructor(content?: string) {
    super(content);
  }

  render(): MarkDownRendered {
    const { name, props, skipContentClass } = JSON.parse(this.content);
    return {
      className: this.className,
      type: MarkDownComponentRenderer.type,
      name,
      props,
      skipContentClass,
    };
  }
}
