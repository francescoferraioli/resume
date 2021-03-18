import * as fs from "fs";
import * as Mustache from "mustache";
const src = fs.readFileSync("src/index.html", "utf8");

const dist = Mustache.render(src, {});

fs.writeFileSync("docs/index.html", dist);
