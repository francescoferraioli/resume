import { HelperDeclareSpec } from "handlebars";

const helpers: HelperDeclareSpec = {
  uppercase: (x: string) => x.toUpperCase(),
  pagePartial: (x: string) => `pages/${x}`,
};

export default helpers;
