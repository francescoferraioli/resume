import { exec } from "child_process";
import { chain, range } from "lodash";

export const partitionInGroups = <T>(items: T[], num: number): T[][] =>
  chain(items)
    .chunk(Math.ceil(items.length / num))
    .value();

export const run = (command: string) => {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};

export const assertUnreachable = (_: never): never => {
  throw new Error("Didn't expect to get here");
};
