import { footerItemsMap } from "@/data/footerItems";
import styles from "../css/singlePage.module.css";
import { notFound } from "next/navigation";

// 显式定义 generateStaticParams 的返回类型
export function generateStaticParams(): { slug: string }[] {
  return Object.keys(footerItemsMap).map((slug) => ({
    slug,
  }));
}

// 定义 params 的具体类型
type PageParams = { slug: string };

// 显式满足 PageProps 的 params 约束
export default async function Page({
  params,
}: {
  params: Promise<PageParams>; // 使用具体类型替代 any
}) {
  // 解包 params
  const resolvedParams = await params;
  const data = footerItemsMap[resolvedParams.slug as keyof typeof footerItemsMap];
  console.log("Data:", data);

  if (!data) {
    console.log("Data not found for slug:", resolvedParams.slug);
    notFound();
  }

  return (
    <main className={styles.singlePageContainer}>
      <div className={styles.card_header}>
        <span className={styles.singlePageTitle}>{data.title}</span>
        <div className={styles.desc}>{data.content}</div>
      </div>
    </main>
  );
}