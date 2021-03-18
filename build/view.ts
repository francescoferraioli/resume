export interface View {
  firstName: string;
  lastName: string;
  pageMeta: {
    1: {
      num: 1;
    };
    2: {
      num: 2;
    };
  };
}

export const view: View = {
  firstName: "Francesco",
  lastName: "Ferraioli",
  pageMeta: {
    1: {
      num: 1,
    },
    2: {
      num: 2,
    },
  },
};
