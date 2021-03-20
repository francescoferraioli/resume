import { range } from "lodash";

export const partitionInGroups = <T>(items: T[], num: number): T[][] => {
  const size = Math.ceil(items.length / num);
  return range(num).map((n) =>
    items.filter((_, i) => i >= n * size && i < (n + 1) * size)
  );
};
