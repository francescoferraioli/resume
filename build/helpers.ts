import { HelperDeclareSpec } from "handlebars";

const helpers: HelperDeclareSpec = {
  uppercase: (x: string) => x.toUpperCase(),
};

export default helpers;
