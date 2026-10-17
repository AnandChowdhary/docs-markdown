module.exports = {
  plugins: [
    [
      "semantic-release-gitmoji",
      {
        releaseRules: {
          patch: {
            include: [":bento:", ":recycle:"],
          },
        },
      },
    ],
    "@semantic-release/github",
    ["@semantic-release/npm", { npmPublish: Boolean(process.env.NPM_TOKEN) }],
    [
      "@semantic-release/git",
      {
        message:
          ":bookmark: v${nextRelease.version} [skip ci]\n\nhttps://github.com/AnandChowdhary/docs-markdown/releases/tag/${nextRelease.gitTag}",
      },
    ],
  ],
};
