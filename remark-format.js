#!/usr/bin/env -S deno run --allow-read --allow-write
import { parse } from "https://deno.land/std@0.175.0/flags/mod.ts";
import { remark } from "npm:remark";
import remarkToc from "npm:remark-toc";
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
            .use({
              // See https://github.com/remarkjs/remark/tree/main/packages/remark-stringify
              settings: {
                // INFO: make the format as close as possible to `deno fmt`
                bullet: "-", // Use `*` for list item bullets (default)
                listItemIndent: "one",
                emphasis: "_",
                rule: "_",
                strong: "_",
                tightDefinitions: true,
              },
            })
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
