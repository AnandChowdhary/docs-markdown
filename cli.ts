#!/usr/bin/env node

import { fetchGoogleDocsFiles, googleDocsToMarkdown } from "./index";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const command = process.argv[2];
if (!command) throw new Error("Command required: 'docs-markdown fetch'");

if (command === "fetch") {
	const files: string[] = (process.argv.length > 3
		? process.argv[3]
		: process.env.FILES || ""
	)
		.split(",")
		.map((i) => i.trim());
	fetchGoogleDocsFiles(files);
}

if (command === "convert") {
	const files: string[] = (process.argv.length > 3
		? process.argv[3]
		: process.env.FILES || ""
	)
		.split(",")
		.map((i) => i.trim());
	files.forEach((file) => {
		const fileContents = JSON.parse(readFileSync(join(".", file)).toString());
		const markdown = googleDocsToMarkdown(fileContents);
		writeFileSync(join(".", `${file.replace(".json", "")}.md`), markdown);
	});
}
