import { last } from "lodash";
import { assertUnreachable } from "../../../utils";
import { MarkDownInstruction } from "../instructions";
import { MarkDownLine } from "../parsers";
import {
  MarkDownColumn,
  MarkDownColumnRenderer,
} from "./MarkDownColumnRenderer";
import {
  MarkDownComponent,
  MarkDownComponentRenderer,
} from "./MarkDownComponentRenderer";
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

export type MarkDownRendered = (
  | MarkDownStandard
  | MarkDownHtml
  | MarkDownSpacer
  | MarkDownColumn
  | MarkDownComponent
) & { className: string | undefined };

const renderers = [
  MarkDownStandardRenderer,
  MarkDownHtmlRenderer,
  MarkDownSpacerRenderer,
  MarkDownColumnRenderer,
  MarkDownComponentRenderer,
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
      if (currentRenderer && getRendererType(currentRenderer) === "column") {
        currentRenderer.addContent(line.line);
        return acc;
      }

      const newRenderer = getRendererFromType(
        line.instruction.renderer,
        line.lineNumber
      );
      newRenderer.setClassName(line.instruction.className);
      blockRendererStack.push(newRenderer);
      return acc;
    }
    case "end-block": {
      if (currentRenderer === undefined) {
        throw new Error(
          `Found end-block without a matching start-block. #${line.lineNumber}`
        );
      }

      const currentRendererType = getRendererType(currentRenderer);
      if (
        currentRendererType === "column" &&
        line.instruction.renderer !== "column"
      ) {
        currentRenderer.addContent(line.line);
        return acc;
      }

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
