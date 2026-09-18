import {MDXRemote} from "next-mdx-remote/rsc";

import {mdxComponents} from "@/components/content/mdx-components";

type MdxContentProps = {
  source: string;
  className?: string;
};

export function MdxContent({source, className}: MdxContentProps) {
  return (
    <div className={["content-prose", className].filter(Boolean).join(" ")}>
      <MDXRemote source={source} components={mdxComponents} />
    </div>
  );
}
