# 📝 Docs Markdown

Convert a Google Docs file (API response) to Markdown

[![Node CI](https://img.shields.io/github/workflow/status/AnandChowdhary/docs-markdown/Node%20CI?label=GitHub%20CI&logo=github)](https://github.com/AnandChowdhary/docs-markdown/actions)
[![Travis CI](https://img.shields.io/travis/AnandChowdhary/docs-markdown?label=Travis%20CI&logo=travis%20ci&logoColor=%23fff)](https://travis-ci.org/AnandChowdhary/docs-markdown)
[![Coverage](https://coveralls.io/repos/github/AnandChowdhary/docs-markdown/badge.svg?branch=master&v=2)](https://coveralls.io/github/AnandChowdhary/docs-markdown?branch=master)
[![Dependencies](https://img.shields.io/librariesio/release/npm/docs-markdown)](https://libraries.io/npm/docs-markdown)
[![License](https://img.shields.io/npm/l/docs-markdown)](https://github.com/AnandChowdhary/docs-markdown/blob/master/LICENSE)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/docs-markdown.svg)](https://snyk.io/test/npm/docs-markdown)
[![Based on Node.ts](https://img.shields.io/badge/based%20on-node.ts-brightgreen)](https://github.com/AnandChowdhary/node.ts)
[![npm type definitions](https://img.shields.io/npm/types/docs-markdown.svg)](https://unpkg.com/browse/docs-markdown/dist/index.d.ts)
[![npm package](https://img.shields.io/npm/v/docs-markdown.svg)](https://www.npmjs.com/package/node.ts)
[![npm downloads](https://img.shields.io/npm/dw/docs-markdown)](https://www.npmjs.com/package/node.ts)
[![Contributors](https://img.shields.io/github/contributors/AnandChowdhary/docs-markdown)](https://github.com/AnandChowdhary/docs-markdown/graphs/contributors)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![npm](https://nodei.co/npm/docs-markdown.png)](https://www.npmjs.com/package/docs-markdown)

## 💡 Usage

Install the package from [npm](https://www.npmjs.com/package/docs-markdown):

```bash
npm install docs-markdown
```

Import and use:

```ts
import { googleDocsToMarkdown } from "docs-markdown";
import { google } from "googleapis";
import { writeFileSync } from "fs";
const oauth2Client = new google.auth.OAuth2(); // Authenticate

const docs = google.docs("v1");
const file = await docs.documents.get({
  documentId: "Google Docs document ID",
  auth: oauth2Client,
});

const markdown = googleDocsToMarkdown(file.data);
writeFileSync("file.md", markdown);
```

## ⭐️ Features

- [x] Paragraphs
- [x] Headings, titles, subtitles
- [x] Bold, italic
- [x] Lists
- [x] Links
- [ ] Images
- [ ] Tables
- [ ] Header, footer

## 👩‍💻 Development

Build TypeScript:

```bash
npm run build
```

## 📄 License

[MIT](./LICENSE) © [Anand Chowdhary](https://anandchowdhary.com)
