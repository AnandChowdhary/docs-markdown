import { google, docs_v1 } from "googleapis";
import { join } from "path";
import _fs from "fs";
const fs = _fs.promises;

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_DOCS_CLIENT_ID,
  process.env.GOOGLE_DOCS_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
oauth2Client.setCredentials({
  access_token: process.env.GOOGLE_DOCS_ACCESS,
  refresh_token: process.env.GOOGLE_DOCS_REFRESH,
});
const docs = google.docs("v1");

export const fetchGoogleDocsFiles = async (files: string[]) => {
  for await (const documentId of files) {
    console.log("\nDownloading document", documentId);
    try {
      const result = await docs.documents.get({
        documentId,
        auth: oauth2Client,
      });
      if (!result.data.title) throw new Error("Title not found");
      await fs.writeFile(
        join(".", `${result.data.title}.md`),
        googleDocsToMarkdown(result.data)
      );
      console.log("Downloaded document", result.data.title);
    } catch (error) {
      console.log("Got an error", error);
    }
  }
};

export const googleDocsToMarkdown = (file: docs_v1.Schema$Document) => {
  let text = `---
title: ${file.title}
documentId: ${file.documentId}
revisionId: ${file.revisionId}
---

`;
  ((file.body || {}).content || []).forEach((item) => {
    if (item.paragraph && item.paragraph.elements) {
      const styleType = ((item.paragraph || {}).paragraphStyle || {})
        .namedStyleType;
      const bullet = (item.paragraph || {}).bullet || {};
      if (bullet.listId) {
        const listDetails = (file.lists || {})[bullet.listId];
        const glyphFormat =
          (((listDetails.listProperties || {}).nestingLevels || [])[0] || {})
            .glyphFormat || "";
        const padding = "  ".repeat(bullet.nestingLevel || 0);
        if (["[%0]", "%0."].includes(glyphFormat)) {
          text += `${padding}1. `;
        } else {
          text += `${padding}- `;
        }
      }
      item.paragraph.elements.forEach((element) => {
        if (element.textRun && content(element) && content(element) !== "\n") {
          if (styleType === "TITLE") {
            text += `# ${content(element)}`;
          } else if (styleType === "SUBTITLE") {
            text += `_${(content(element) || "").trim()}_`;
          } else if (styleType === "HEADING_1") {
            text += `## ${content(element)}`;
          } else if (styleType === "HEADING_2") {
            text += `### ${content(element)}`;
          } else if (styleType === "HEADING_3") {
            text += `#### ${content(element)}`;
          } else if (styleType === "HEADING_4") {
            text += `##### ${content(element)}`;
          } else if (styleType === "HEADING_5") {
            text += `###### ${content(element)}`;
          } else if (styleType === "HEADING_6") {
            text += `####### ${content(element)}`;
          } else if (
            (element.textRun.textStyle || {}).bold &&
            (element.textRun.textStyle || {}).italic
          ) {
            text += `**_${content(element)}_**`;
          } else if ((element.textRun.textStyle || {}).italic) {
            text += `_${content(element)}_`;
          } else if ((element.textRun.textStyle || {}).bold) {
            text += `**${content(element)}**`;
          } else {
            text += content(element);
          }
        }
      });
      text += bullet.listId
        ? (text.split("\n").pop() || "").trim().endsWith("\n")
          ? ""
          : "\n"
        : "\n\n";
    }
  });
  const lines = text.split("\n");
  const linesToDelete: number[] = [];
  lines.forEach((line, index) => {
    if (index > 2) {
      if (
        !line.trim() &&
        ((lines[index - 1] || "").trim().startsWith("1. ") ||
          (lines[index - 1] || "").trim().startsWith("- ")) &&
        ((lines[index + 1] || "").trim().startsWith("1. ") ||
          (lines[index + 1] || "").trim().startsWith("- "))
      )
        linesToDelete.push(index);
    }
  });
  text = text
    .split("\n")
    .filter((_, i) => !linesToDelete.includes(i))
    .join("\n");
  return text.replace(/\n\s*\n\s*\n/g, "\n\n") + "\n";
};

const content = (element: docs_v1.Schema$ParagraphElement) => {
  const textRun = element.textRun || {};
  const text = (element.textRun || {}).content;
  if ((textRun.textStyle || {}).link)
    return `[${text}](${((textRun.textStyle || {}).link || {}).url})`;
  return text;
};
