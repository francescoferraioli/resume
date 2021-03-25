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
    const classes = ["content"].concat(className ?? []);
    return new Handlebars.SafeString(
      `<div class="${classes.join(" ")}">
        ${options.fn(this)}
      </div>`
    );
  },
  switch: function (value, options) {
    this.switch_value = value;
    return options.fn(this);
  },
  case: function (value, options) {
    if (value == this.switch_value) {
      return options.fn(this);
    }
  },
  getPercentage: (count: number) => 100 / count,
  toArray: (x: any) => [x],
};

export default helpers;
