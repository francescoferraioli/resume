import * as fs from "fs";
import * as Handlebars from "handlebars";
import { data } from "./data";
import helpers from "./helpers";

Handlebars.registerPartial("partial", (context) =>
  Handlebars.compile(
    fs.readFileSync(`src/partials/${context.partial}.hbs`, "utf8")
  )(context)
);

Object.keys(helpers).forEach((helper) => {
  Handlebars.registerHelper(helper, helpers[helper]);
});

const src = fs.readFileSync("src/index.hbs", "utf8");

const dist = Handlebars.compile(src)(data);

fs.writeFileSync("docs/index.html", dist);
