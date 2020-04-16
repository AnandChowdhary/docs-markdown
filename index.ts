import { docs_v1 } from "googleapis";

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
