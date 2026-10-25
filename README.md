# Signal & Syntax

A small editorial website for practical AI tips, AI tools, and command-line workflows.

## Getting started

Install the dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to browse the site.

## Writing content

Articles and topics live in `lib/content.ts`. Add an article to the `articles` list with a unique URL slug, summary, topic, tags, and content blocks. Article pages and topic pages are generated from this content list.
