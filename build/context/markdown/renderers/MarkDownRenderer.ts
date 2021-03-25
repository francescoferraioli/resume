import { MarkDownRendered } from ".";

export abstract class MarkDownRenderer {
  protected contents: string[];
  protected className: string | undefined;

  constructor(content: string | undefined) {
    this.contents = [].concat(content ?? []);
  }

  abstract render(): MarkDownRendered;

  get content() {
    return this.contents.join("\n");
  }

  addContent(content: string) {
    this.contents.push(content);
  }

  setClassName(className: string | undefined) {
    this.className = className;
  }
}
