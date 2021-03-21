import * as Handlebars from "handlebars";
import { HelperDeclareSpec } from "handlebars";
import { partitionInGroups } from "./utils";

const helpers: HelperDeclareSpec = {
  uppercase: (x: string) => x.toUpperCase(),
  sectionPartial: (x: string) => `sections/${x}`,
  formatPhone: (x: string) => {
    const [, first, second, third] = x.match(/^(\d{3})(\d{3})(\d{3})$/);
    return `0${first} ${second} ${third}`;
  },
  partitionInGroups,
  content: function (className, options) {
    return new Handlebars.SafeString(
      `<div class="content ${className}">
        ${options.fn(this)}
      </div>`
    );
  },
};

export default helpers;
