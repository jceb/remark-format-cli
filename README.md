# remark-format-cli

remark-based CLI formatter for Markdown files, including table of contents
genreation.

- Source code:
  [github.com/jceb/remark-format-cli](https://github.com/jceb/remark-format-cli)
- Deno module:
  [deno.land/x/remark_format_cli](https://deno.land/x/remark_format_cli)

## Contents

1. [Usage](#usage)
2. [Install](#install)
3. [Configuration](#configuration)
4. [History](#history)

## Usage

Format a Markdown file:

```bash
deno run --unstable --allow-read --allow-write https://deno.land/x/remark_format_cli/remark-format.js README.md
```

Or with the locally [installed](#install) script:

```bash
remark-format README.md
```

## Install

```bash
deno install --unstable --allow-read --allow-write https://deno.land/x/remark_format_cli/remark-format.js
```

Once installed, the local command `remark-format` will be available.

## Configuration

Currently, there are no configuration or command line options. Hopefully,
configuration options will be added in the future. For the moment, it's very
easy to customize the code directly in
[`./remark-format.js`](./remark-format.js)

## History

There are many markdown table of contents generators. However, I haven't found
one yet that generates an ordered list and is well maintained. Furthermore, I'd
very much prefer a simple, if possible non-existent, installation process.

With this in mind, I found
[`remark-toc`](https://github.com/remarkjs/remark-toc) and opted for
[`deno`](https://deno.land/) as a runtime since it recently added support for
NPM modules. This combination made it very simple to create a custom remark CLI
that integrates the [`remark-toc`](https://github.com/remarkjs/remark-toc)
plugin.

TOC generators I've tried before:

- [ycd/toc](https://github.com/ycd/toc) - works well but the installation is a
  bit of a struggle
- [gh-md-toc](https://github.com/ekalinin/github-markdown-toc) - doesn't support
  ordered tocs
