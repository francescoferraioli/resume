import { HelperDeclareSpec } from "handlebars";

const helpers: HelperDeclareSpec = {
  uppercase: (x: string) => x.toUpperCase(),
  pagePartial: (x: string) => `pages/${x}`,
  sectionPartial: (x: string) => `sections/${x}`,
};

export default helpers;
