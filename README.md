# 🏷️ Node.ts

Opinionated starter for server-side Node.js libraries, with [TypeScript](https://github.com/microsoft/TypeScript), tests with [Jest](https://github.com/facebook/jest), automated releases with [GitHub Actions](https://github.com/features/actions) and [Semantic Release](https://github.com/semantic-release/semantic-release), and coverage reporting from [Travis CI](https://travis-ci.org) to [Coveralls](https://coveralls.io).

[![Node CI](https://img.shields.io/github/workflow/status/AnandChowdhary/node.ts/Node%20CI?label=GitHub%20CI&logo=github)](https://github.com/AnandChowdhary/node.ts/actions)
[![Travis CI](https://img.shields.io/travis/AnandChowdhary/node.ts?label=Travis%20CI&logo=travis%20ci&logoColor=%23fff)](https://travis-ci.org/AnandChowdhary/node.ts)
[![Coverage](https://coveralls.io/repos/github/AnandChowdhary/node.ts/badge.svg?branch=master&v=2)](https://coveralls.io/github/AnandChowdhary/node.ts?branch=master)
[![Dependencies](https://img.shields.io/librariesio/release/npm/@anandchowdhary/node.ts)](https://libraries.io/npm/@anandchowdhary%2Fnode.ts)
[![License](https://img.shields.io/npm/l/@anandchowdhary/node.ts)](https://github.com/AnandChowdhary/node.ts/blob/master/LICENSE)
[![Vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/@anandchowdhary/node.ts.svg)](https://snyk.io/test/npm/@anandchowdhary/node.ts)
[![Based on Node.ts](https://img.shields.io/badge/based%20on-node.ts-brightgreen)](https://github.com/AnandChowdhary/node.ts)
[![npm type definitions](https://img.shields.io/npm/types/@anandchowdhary/node.ts.svg)](https://unpkg.com/browse/@anandchowdhary/node.ts/dist/index.d.ts)
[![npm package](https://img.shields.io/npm/v/@anandchowdhary/node.ts.svg)](https://www.npmjs.com/package/node.ts)
[![npm downloads](https://img.shields.io/npm/dw/@anandchowdhary/node.ts)](https://www.npmjs.com/package/node.ts)
[![Contributors](https://img.shields.io/github/contributors/AnandChowdhary/node.ts)](https://github.com/AnandChowdhary/node.ts/graphs/contributors)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

[![npm](https://nodei.co/npm/@anandchowdhary/node.ts.png)](https://www.npmjs.com/package/@anandchowdhary/node.ts)

## ⭐ Using Node.ts

### Setting up repository

To get started, first generate your new repository. There are two ways to do this:

1. [Generate a repository with Node.ts template](https://github.com/AnandChowdhary/node.ts/generate) is GitHub's preferred way
2. [Import this repository](https://github.com/new/import) keeps the commit history, which you may want

### Updating `README.md`

Make the following changes to this `README.md` (note that these changes are **case-sensitive**):

1. Replace "Node.ts" with your project name
2. Replace "AnandChowdhary/node.ts" with your GitHub "username/repository"
3. Replace "@anandchowdhary/node.ts" with your npm package name
4. Replace "@anandchowdhary%2Fnode.ts" with your npm package name, [URL-encoded](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURI)

### Updating `package.json`

Make the following changes to `package.json`:

1. Replace "@anandchowdhary/node.ts" with your npm package name
2. Change the version to "0.0.0" for Semantic Release to take over
3. Replace the description with your npm package description
4. Replace "AnandChowdhary/node.ts" with your GitHub "username/repository"
5. Replace "Anand Chowdhary <mail@anandchowdhary.com>" with you as the author
6. Replace "anandchowdhary.github.io" with "username.github.io"

### Last steps

1. Add your npm token (`NPM_TOKEN`) as a GitHub secret in your repository ([more details](https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/github-actions.md))
2. Log in or sign up on [Coveralls](https://coveralls.io) and [add your repository](https://coveralls.io/repos/new)
3. Remove this section ("Using Node.ts"), keeping the "Usage" section below
4. Replace "AnandChowdhary/eject-dependencies" with your GitHub "username/repository" in `.releaserc.json`
5. [Set up GitHub Pages with `master` branch](https://help.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#choosing-a-publishing-source)
6. Write commits messages using [Gitmoji](https://gitmoji.carloscuesta.me)

## 💡 Usage

Install the package from [npm](https://www.npmjs.com/package/@anandchowdhary/node.ts):

```bash
npm install @anandchowdhary/node.ts
```

Import and use;

```ts
import { nodeTs } from "@anandchowdhary/node-ts";

nodeTs();
```

## 👩‍💻 Development

Build TypeScript:

```bash
npm run build
```

Run unit tests and view coverage:

```bash
npm run test-without-reporting
```

## 📄 License

[MIT](./LICENSE) © [Anand Chowdhary](https://anandchowdhary.com)
