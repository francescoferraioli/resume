import { MarkDownRendered } from ".";

export abstract class MarkDownRenderer {
  protected contents: string[];

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
}
