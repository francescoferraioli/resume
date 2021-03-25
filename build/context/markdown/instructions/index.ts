const startBlock = "start-block";
const endBlock = "end-block";

export const isInstruction = (line: string): boolean => line.startsWith("md:");

export const parseInstruction = (
  line: string,
  lineNumber: number
): MarkDownInstruction => {
  const [, type, rest] = line.split(":");
  return {
    lineNumber,
    type: "instruction",
    instruction: getInstructionType(type, rest, lineNumber),
    line: line,
  };
};

const getInstructionType = (
  type: string,
  rest: string,
  lineNumber: number
): MarkDownInstruction["instruction"] => {
  switch (type) {
    case startBlock:
      const [renderer, className] = rest.split(".");
      return {
        instruction: startBlock,
        renderer,
        className,
      };
    case endBlock:
      return {
        instruction: endBlock,
        renderer: rest,
      };
    default:
      throw new Error(`Unsupported instruction type: ${type}. #${lineNumber}`);
  }
};

export type MarkDownInstruction = {
  lineNumber: number;
  type: "instruction";
  instruction: MarkDownStartBlock | MarkDownEndBlock;
  line: string;
};

interface MarkDownStartBlock {
  instruction: "start-block";
  renderer: string;
  className: string | undefined;
}

interface MarkDownEndBlock {
  instruction: "end-block";
  renderer: string;
}
