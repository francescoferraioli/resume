import { exec } from "child_process";
import { range } from "lodash";

export const partitionInGroups = <T>(items: T[], num: number): T[][] => {
  const size = Math.ceil(items.length / num);
  return range(num).map((n) =>
    items.filter((_, i) => i >= n * size && i < (n + 1) * size)
  );
};

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
