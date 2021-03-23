import { MarkDownRendered } from "..";

export abstract class MarkDownRenderer {
  constructor(protected contents: string) {}

  abstract render(): MarkDownRendered;
}
