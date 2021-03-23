const instructions: Record<
  string,
  MarkDownInstruction["instruction"]["instruction"]
> = {
  startBlock: "start-block",
  endBlock: "end-block",
};

export const isInstruction = (line: string): boolean => line.startsWith("md:");

export const parseInstruction = (line: string): MarkDownInstruction => {
  const [, type, rest] = line.split(":");
  return {
    type: "instruction",
    instruction: getInstructionType(type, rest),
  };
};

const getInstructionType = (
  type: string,
  rest: string
): MarkDownInstruction["instruction"] => {
  switch (type) {
    case instructions.startBlock:
    case instructions.endBlock:
      return {
        instruction: type,
        renderer: rest,
      };
    default:
      throw new Error(`Unsupported instruction type: ${type}`);
  }
};

export type MarkDownInstruction = {
  type: "instruction";
  instruction: MarkDownStartBlock | MarkDownEndBlock;
};

interface MarkDownStartBlock {
  instruction: "start-block";
  renderer: string;
}

interface MarkDownEndBlock {
  instruction: "end-block";
  renderer: string;
}
