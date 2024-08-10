import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import path from "path";

const docsDir = path.join(process.cwd(), "src", "docs");

interface DocData {
  title: string;
  order: number;
  date: string;
  author: string;
  category: string;
  parent: string | null;
  tags: string[];
}

export const getDoc = () => {
  const fileNames = readdirSync(docsDir);

  const allDocsData = fileNames.map((fileName) => {
    const id = fileName.replace(".md", "");

    const fullPath = path.join(docsDir, fileName);
    const fileContents = readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);
    const data = matterResult.data as DocData;

    return {
      id,
      ...data,
    };
  });

  return allDocsData.sort((a, b) => {
    if (a.order < b.order) {
      return -1;
    } else {
      return 0;
    }
  });
};
