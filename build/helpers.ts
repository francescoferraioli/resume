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
  content: function (arg1, arg2, arg3) {
    const { className, options, skipContentWrapper } = contentParseArguments(
      arg1,
      arg2,
      arg3
    );
    const classes = ["content"].concat(className ?? []);
    const buildHtml = (inner: string) =>
      skipContentWrapper
        ? inner
        : `<div class="${classes.join(" ")}">
        ${inner}
      </div>`;
    return new Handlebars.SafeString(buildHtml(options.fn(this)));
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

type ContentArguments = {
  className?: string;
  skipContentWrapper?: boolean;
  options: Handlebars.HelperOptions;
};

const contentParseArguments = (
  arg1: any,
  arg2: any,
  arg3
): ContentArguments => {
  if (arg3) {
    return {
      className: arg1,
      skipContentWrapper: arg2,
      options: arg3,
    };
  }

  if (arg2) {
    return {
      className: arg1,
      options: arg2,
    };
  }

  return {
    options: arg1,
  };
};
