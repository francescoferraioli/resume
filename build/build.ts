import * as fs from "fs";
import * as Handlebars from "handlebars";
import { getContext } from "./context";
import helpers from "./helpers";

function html() {
  Handlebars.registerPartial("partial", (context) =>
    Handlebars.compile(
      fs.readFileSync(`src/partials/${context.partial}.hbs`, "utf8")
    )(context)
  );

  Object.keys(helpers).forEach((helper) => {
    Handlebars.registerHelper(helper, helpers[helper]);
  });

  const src = fs.readFileSync("src/index.hbs", "utf8");

  const context = getContext();

  const dist = Handlebars.compile(src)(context);

  fs.writeFileSync("docs/index.html", dist);
}

html();
