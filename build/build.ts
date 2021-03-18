import * as fs from "fs";
import * as Mustache from "mustache";
import { view } from "./view";

const src = fs.readFileSync("src/index.mustache", "utf8");

const dist = Mustache.render(src, view, (partial) =>
  fs.readFileSync(`src/partials/${partial}.mustache`, "utf8")
);

fs.writeFileSync("docs/index.html", dist);
