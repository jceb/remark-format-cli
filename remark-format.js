#!/usr/bin/env -S deno run --allow-read --allow-write
import { read, write } from "npm:to-vfile";
import { remark } from "npm:remark";
import remarkToc from "npm:remark-toc";

function main(filenames) {
  const promises = [];
  for (const i in filenames) {
    promises.push(
      read(filenames[i])
        .then((data) =>
          remark()
            .use(remarkToc, { ordered: true, heading: "contents" })
            .process(data)
        )
        .then(write).then((res) => console.log("formatted", res.history[0])),
    );
  }
  return Promise.all(promises);
}

await main(Deno.args);
