import { HelperDeclareSpec } from "handlebars";

const helpers: HelperDeclareSpec = {
  uppercase: (x: string) => x.toUpperCase(),
  pagePartial: (x: string) => `pages/${x}`,
  sectionPartial: (x: string) => `sections/${x}`,
  formatPhone: (x: string) => {
    const [, first, second, third] = x.match(/^(\d{3})(\d{3})(\d{3})$/);
    return `0${first} ${second} ${third}`;
  },
};

export default helpers;
