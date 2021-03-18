import * as fs from "fs";
import * as Handlebars from "handlebars";
import { data } from "./data";

Handlebars.registerPartial("partial", (context) =>
  Handlebars.compile(
    fs.readFileSync(`src/partials/${context.partial}.hbs`, "utf8")
  )(context)
);

const src = fs.readFileSync("src/index.hbs", "utf8");

const dist = Handlebars.compile(src)(data);

fs.writeFileSync("docs/index.html", dist);
