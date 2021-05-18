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

### API

The `fetchGoogleDocsFiles` helper can download a document from Google Docs and save it as a markdown file:

```ts
import { fetchGoogleDocsFiles } from "docs-markdown";

// Google Docs document ID
await fetchGoogleDocsFiles(["1UEUrJ98RXu9BNcFj3pMgiUALQpjIb8Y-gNu-YhlYvFQ"]);

// Google Docs document ID and file name
await fetchGoogleDocsFiles(["1UEUrJ98RXu9BNcFj3pMgiUALQpjIb8Y-gNu-YhlYvFQ:filename.md"]);

// Multiple Google Docs documents (comma-separated string)
await fetchGoogleDocsFiles(["documentId1", "documentId2", "documentId3"]);
```

You can also use the `googleDocsToMarkdown` function to manually convert documents:

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

### CLI

Fetch files and save them as markdown:

```bash
# Google Docs document ID
docs-markdown fetch "1UEUrJ98RXu9BNcFj3pMgiUALQpjIb8Y-gNu-YhlYvFQ"

# Google Docs document ID with file name
docs-markdown fetch "1UEUrJ98RXu9BNcFj3pMgiUALQpjIb8Y-gNu-YhlYvFQ:filename.md"

# Multiple Google Docs documents
docs-markdown fetch "documentId1, documentId2, documentId3"

# Convert a JSON document to markdown
docs-markdown convert "path/to/file.json"
```

### Authentication

The following environment variables are required to fetch files from Google Docs. They are not required when converting JSON documents to markdown:

- `GOOGLE_DOCS_CLIENT_ID`
- `GOOGLE_DOCS_CLIENT_SECRET`
- `GOOGLE_DOCS_ACCESS`
- `GOOGLE_DOCS_REFRESH`

To learn how to create a client ID and secret, read the article [Using OAuth 2.0 to Access Google APIs](https://developers.google.com/identity/protocols/oauth2). Once you've created them, create an access token and a refresh token, use the [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/) with your client ID and secret.

## ⭐️ Features

- [x] Paragraphs
- [x] Headings, titles, subtitles
- [x] Bold, italic
- [x] Lists
- [x] Links
- [ ] Images
- [x] Tables
- [ ] Header, footer

## 🍳 Recipes

### GitHub Actions + Google Docs CI

If you want to sync your Google Docs documents as markdown files to a GitHub repository, you can use this GitHub Actions workflow that runs every day, fetches your documents, and commit them to your repo. Make sure you have all the required environment variables stored as GitHub Secrets:

```yml
name: Google Docs
on:
  schedule:
    - cron: "0 0 * * *"
jobs:
  release:
    name: Fetch Google Docs
    runs-on: ubuntu-18.04
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          node-version: 12
      - name: Download files
        run: npx docs-markdown fetch "1UEUrJ98RXu9BNcFj3pMgiUALQpjIb8Y-gNu-YhlYvFQ"
        env:
          GOOGLE_DOCS_ACCESS: ${{ secrets.GOOGLE_DOCS_ACCESS }}
          GOOGLE_DOCS_REFRESH: ${{ secrets.GOOGLE_DOCS_REFRESH }}
          GOOGLE_DOCS_CLIENT_ID: ${{ secrets.GOOGLE_DOCS_CLIENT_ID }}
          GOOGLE_DOCS_CLIENT_SECRET: ${{ secrets.GOOGLE_DOCS_CLIENT_SECRET }}
      - name: Commit new data
        uses: stefanzweifel/git-auto-commit-action@v4.1.1
        with:
          commit_message: "Update Google Docs file"
          commit_user_name: GitHub Actions
          commit_user_email: actions@github.com
          commit_author: GitHub Actions <actions@github.com>
```

## 👩‍💻 Development

Build TypeScript:

```bash
npm run build
```

## 📄 License

[MIT](./LICENSE) © [Anand Chowdhary](https://anandchowdhary.com)
