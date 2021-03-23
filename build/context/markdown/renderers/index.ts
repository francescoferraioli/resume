import { MarkDownHtmlRenderer } from "./MarkDownHtmlRenderer";
import { MarkDownRenderer } from "./MarkDownRenderer";
import { MarkDownSpacerRenderer } from "./MarkDownSpacerRenderer";
import { MarkDownStandardRenderer } from "./MarkDownStandardRenderer";

export const getRendererForText = (text: string): MarkDownRenderer => {
  if (text.trim() === "") {
    return new MarkDownSpacerRenderer(text);
  }

  if (text.trim().startsWith("<")) {
    return new MarkDownHtmlRenderer(text);
  }

  return new MarkDownStandardRenderer(text);
};
