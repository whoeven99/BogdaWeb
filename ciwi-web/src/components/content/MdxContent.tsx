import {MDXRemote} from "next-mdx-remote/rsc";

import {mdxComponents} from "@/components/content/mdx-components";

type MdxContentProps = {
  source: string;
  className?: string;
};

export function MdxContent({source, className}: MdxContentProps) {
  return (
    <div className={className}>
      <MDXRemote source={source} components={mdxComponents} />
    </div>
  );
}
