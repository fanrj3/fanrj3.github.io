# Byte World authoring guide

Byte World is generated from the `.mdx` files in this directory. Edit them in VS Code, commit, and push to `master`; the existing GitHub Actions workflow rebuilds the site automatically.

## Create a note

1. Copy `_template.mdx` to a lowercase kebab-case filename, for example `tiny-autograd-engine.mdx`.
2. Fill in the YAML frontmatter at the top of the file.
3. Change `status` from `draft` to `in-progress` or `complete` when the note should appear online.
4. Run `npm run build` before pushing.

The filename becomes the URL:

```text
content/byte-world/tiny-autograd-engine.mdx
-> https://fanrj3.github.io/byte-world/tiny-autograd-engine/
```

Files whose names begin with `_` are never published. Notes with `status: draft` are also excluded from the list and static build.

## Frontmatter

```yaml
---
title: A Tiny Autograd Engine
description: Implementing reverse-mode automatic differentiation with a small scalar graph.
date: 2026-08-12
status: in-progress
series: Systems from Scratch
tags:
  - Python
  - Autograd
repo: https://github.com/fanrj3/example
demo: https://example.com
featured: false
---
```

Required fields: `title`, `description`, and `date`.

Use `featured: true` on at most one note. It becomes the large entry at the top of `/byte-world/`.

## Writing features

- Formula: `$x_t$` or `$$x_t = (1-t)x_0 + tx_1$$`
- Code fence: ```` ```python title="train.py" ````
- Headings: `##` and `###` automatically populate the table of contents.
- Images: put files under `public/byte-world/<slug>/` and reference `/byte-world/<slug>/figure.png`.
- Callout: `<Callout title="Key idea" type="idea">...</Callout>`
- Figure: `<Figure src="/byte-world/<slug>/figure.png" alt="..." caption="..." />`

## Projects

The separate Projects page is edited in:

- English: `content/projects.toml`
- Chinese: `content_zh/projects.toml`

Projects are outcome-oriented entries such as project pages, papers, repositories, and demos. Byte World is for implementation notes and learning records.
