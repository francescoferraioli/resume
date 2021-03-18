import * as fs from "fs";
import * as Mustache from "mustache";
import { view } from "./view";

const src = fs.readFileSync("src/index.mustache", "utf8");

const dist = Mustache.render(src, view);

fs.writeFileSync("docs/index.html", dist);
