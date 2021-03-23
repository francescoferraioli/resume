import { last } from "lodash";
import { assertUnreachable } from "../../../utils";
import { MarkDownInstruction } from "../instructions";
import { MarkDownLine } from "../parsers";
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

const getRendererForText = (text: string): MarkDownRenderer => {
  if (text.trim() === "") {
    return new MarkDownSpacerRenderer(text);
  }

  if (text.trim().startsWith("<")) {
    return new MarkDownHtmlRenderer(text);
  }

  return new MarkDownStandardRenderer(text);
};

const getRendererFromType = (
  type: string,
  lineNumber: number
): MarkDownRenderer => {
  for (let i = 0; i < renderers.length; i++) {
    const renderer = renderers[i];
    if (type === renderer.type) {
      return new renderer();
    }
  }
  throw new Error(`Unsupported renderer: ${type}. ${lineNumber}`);
};

export const renderLines = (blockRendererStack: MarkDownRenderer[]) => (
  acc: MarkDownRendered[],
  line: MarkDownLine
): MarkDownRendered[] => {
  switch (line.type) {
    case "text":
      return renderText(blockRendererStack)(acc, line.line);
    case "instruction":
      return renderInstruction(blockRendererStack)(acc, line);
    default:
      assertUnreachable(line);
  }
};

const renderText = (blockRendererStack: MarkDownRenderer[]) => (
  acc: MarkDownRendered[],
  line: string
): MarkDownRendered[] => {
  const currentRenderer = last(blockRendererStack);
  if (currentRenderer) {
    currentRenderer.addContent(line);
    return acc;
  }
  return [...acc, getRendererForText(line).render()];
};

const renderInstruction = (blockRendererStack: MarkDownRenderer[]) => (
  acc: MarkDownRendered[],
  line: MarkDownInstruction
): MarkDownRendered[] => {
  const currentRenderer = last(blockRendererStack);
  switch (line.instruction.instruction) {
    case "start-block": {
      blockRendererStack.push(
        getRendererFromType(line.instruction.renderer, line.lineNumber)
      );
      return acc;
    }
    case "end-block": {
      if (currentRenderer === undefined) {
        throw new Error(
          `Found end-block without a matching start-block. #${line.lineNumber}`
        );
      }
      const currentRendererType = getRendererType(currentRenderer);
      if (currentRendererType !== line.instruction.renderer) {
        throw new Error(
          `Found end-block for renderer '${line.instruction.renderer}' but was expecing end-block for renderer '${currentRendererType}'. #${line.lineNumber}`
        );
      }
      blockRendererStack.pop();
      return [...acc, currentRenderer.render()];
    }
  }
};
