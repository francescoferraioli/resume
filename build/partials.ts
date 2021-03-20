import { Template } from "handlebars";

const partials: Record<string, Template> = {
  fullName: "{{ firstName }} {{ lastName }}",
};

export default partials;
