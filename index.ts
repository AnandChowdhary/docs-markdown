import { readFileSync } from "fs";
import { docs_v1 } from "googleapis";

export const googleDocsToMarkdown = (file: docs_v1.Schema$Document) => {
  let text = `---
title: ${file.title}
documentId: ${file.documentId}
revisionId: ${file.revisionId}
---

`;
  return text;
};

const file = JSON.parse(readFileSync("helpers/document.json").toString());
console.log(googleDocsToMarkdown(file));
