#!/usr/bin/env -S deno run --allow-read --allow-write
import { parse } from "https://deno.land/std@0.175.0/flags/mod.ts";
import { remark } from "npm:remark";
import remarkToc from "npm:remark-toc";
import remarkFrontmatter from "npm:remark-frontmatter";
import remarkStringify from "npm:remark-stringify";
import remarkGfm from "npm:remark-gfm";
import { read, write } from "npm:to-vfile";

function main(parsedArgs) {
  const filenames = parsedArgs["_"] || [];
  const maxDepth = Number(parsedArgs["maxdepth"]) || 6;
  const heading = parsedArgs["heading"] ||
    "toc|table[ -]of[ -]contents?|contents|agenda";
  const promises = [];
  for (const i in filenames) {
    promises.push(
      read(filenames[i])
        .then((data) =>
          remark()
            .use(remarkToc, {
              // See https://github.com/remarkjs/remark-toc
              heading,
              maxDepth,
              ordered: true,
              tight: true,
            })
            .use(remarkStringify, {
              // See https://github.com/remarkjs/remark/tree/main/packages/remark-stringify
              // INFO: make the format as close as possible to `deno fmt`
              bullet: "-",
              bulletOther: "*",
              listItemIndent: "one",
              emphasis: "_",
              rule: "-",
              strong: "*",
              tightDefinitions: true,
            })
            .use(
              // See https://github.com/remarkjs/remark-frontmatter
              // Support for yaml frontmatter
              remarkFrontmatter,
              ["yaml", "toml"],
            )
            .use(
              // See https://github.com/remarkjs/remark-gfm
              // Support for github markdown
              remarkGfm
            )
            .process(data)
        )
        .then(write).then((res) => console.log("formatted", res.history[0])),
    );
  }
  return Promise.all(promises);
}

const args = parse(Deno.args);

if (args["h"] || args["help"]) {
  console.log(
    "Usage:\nremark-format.js [--maxdepth=Number|--heading=TocHeading] [FILENAMES]",
  );
} else {
  await main(args);
}
