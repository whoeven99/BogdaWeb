import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import {z} from "zod";

const contentRoot = path.join(process.cwd(), "content");

export function getContentDirectory(...segments: string[]) {
  return path.join(contentRoot, ...segments);
}

export function listMdxFiles(directory: string): string[] {
  if (!fs.existsSync(directory)) {
    return [];
  }

  return fs.readdirSync(directory, {withFileTypes: true}).flatMap((entry) => {
    const resolvedPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      return listMdxFiles(resolvedPath);
    }

    return entry.name.endsWith(".mdx") ? [resolvedPath] : [];
  });
}

export function readMdxDocument<TSchema extends z.ZodTypeAny>(filePath: string, schema: TSchema) {
  const raw = fs.readFileSync(filePath, "utf8");
  const {data, content} = matter(raw);

  return {
    filePath,
    content,
    frontmatter: schema.parse(data),
  };
}
