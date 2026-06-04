import { googleDocsToMarkdown } from "./index";

describe("googleDocsToMarkdown", () => {
  it("formats linked text as valid Markdown links", () => {
    const markdown = googleDocsToMarkdown({
      title: "Linked document",
      documentId: "doc-1",
      revisionId: "rev-1",
      body: {
        content: [
          {
            paragraph: {
              elements: [
                { textRun: { content: "Read " } },
                {
                  textRun: {
                    content: "the docs",
                    textStyle: {
                      link: { url: "https://example.com/docs" },
                    },
                  },
                },
                { textRun: { content: " today" } },
              ],
            },
          },
        ],
      },
    });

    expect(markdown).toContain("Read [the docs](https://example.com/docs) today");
  });
});
