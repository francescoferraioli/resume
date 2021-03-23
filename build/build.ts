import * as fs from "fs";
import * as Handlebars from "handlebars";
import * as Sass from "sass";
import { getContext } from "./context";
import partials from "./partials";
import helpers from "./helpers";
import { run } from "./utils";

function html() {
  Handlebars.registerPartial("partial", (context) =>
    Handlebars.compile(
      fs.readFileSync(`src/partials/${context.partial}.hbs`, "utf8")
    )(context)
  );

  Object.keys(partials).forEach((partial) => {
    Handlebars.registerPartial(partial, partials[partial]);
  });

  Object.keys(helpers).forEach((helper) => {
    Handlebars.registerHelper(helper, helpers[helper]);
  });

  const src = fs.readFileSync("src/index.hbs", "utf8");

  const context = getContext();

  const dist = Handlebars.compile(src)(context);

  fs.writeFileSync("docs/index.html", dist);
}

function css() {
  const dist = Sass.renderSync({
    file: "src/scss/index.scss",
  });

  fs.writeFileSync("docs/css/index.css", dist.css);
}

function js() {
  run("cp src/js/index.js docs/js/index.js");
}

try {
  html();
  css();
  js();
} catch (e) {
  console.log("*****BUILD FAILED!****");
  throw e;
}

console.log("*****BUILD SUCCEEDED!****");
