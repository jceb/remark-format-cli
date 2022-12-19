#!/usr/bin/env -S deno run --allow-read --allow-write
import { remark } from "npm:remark";
import remarkToc from "npm:remark-toc";
import { read, write } from "npm:to-vfile";

function main(filenames) {
  const promises = [];
  for (const i in filenames) {
    promises.push(
      read(filenames[i])
        .then((data) =>
          remark()
            .use(remarkToc, {
              heading: "contents",
              ordered: true,
              tight: true,
            })
            .use({
              // See <https://github.com/remarkjs/remark/tree/main/packages/remark-stringify> for more options.
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

await main(Deno.args);
