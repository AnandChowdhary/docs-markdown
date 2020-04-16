import { writeFileSync, readFileSync } from "fs";
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

const file = JSON.parse(readFileSync("document.json").toString());
writeFileSync("document.md", googleDocsToMarkdown(file));
