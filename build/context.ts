export interface Context {
  firstName: string;
  lastName: string;
}

export const getContext = (): Context => {
  return {
    firstName: "Francesco",
    lastName: "Ferraioli",
  };
};
