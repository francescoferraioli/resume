import { MarkDownHtml, MarkDownHtmlRenderer } from "./MarkDownHtmlRenderer";
import { MarkDownRenderer } from "./MarkDownRenderer";
import {
  MarkDownSpacer,
  MarkDownSpacerRenderer,
} from "./MarkDownSpacerRenderer";
import {
  MarkDownStandard,
  MarkDownStandardRenderer,
} from "./MarkDownStandardRenderer";

export type MarkDownRendered = MarkDownStandard | MarkDownHtml | MarkDownSpacer;

const renderers = [
  MarkDownStandardRenderer,
  MarkDownHtmlRenderer,
  MarkDownSpacerRenderer,
];

export const getRendererType = (renderer: MarkDownRenderer) =>
  Object.getPrototypeOf(renderer).constructor.type;

export const getRendererForText = (text: string): MarkDownRenderer => {
  if (text.trim() === "") {
    return new MarkDownSpacerRenderer(text);
  }

  if (text.trim().startsWith("<")) {
    return new MarkDownHtmlRenderer(text);
  }

  return new MarkDownStandardRenderer(text);
};

export const getRendererFromType = (
  type: string,
  lineNumber: number
): MarkDownRenderer => {
  for (let i = 0; i < renderers.length; i++) {
    const renderer = renderers[i];
    if (type === renderer.type) {
      return new renderer("");
    }
  }
  throw new Error(`Unsupported renderer: ${type}. ${lineNumber}`);
};
