import { footerItemsMap } from "@/data/footerItems";
import styles from "../css/singlePage.module.css";
import { notFound } from "next/navigation";

// 显式定义 generateStaticParams 的返回类型
export function generateStaticParams(): { slug: string }[] {
  return Object.keys(footerItemsMap).map((slug) => ({
    slug,
  }));
}

// 让 TypeScript 接受 Next.js 的 PageProps 约束
export default function Page({
  params,
}: {
  params: Awaited<ReturnType<typeof generateStaticParams>[number]>; // 基于 generateStaticParams 的返回类型
}) {
  // 确保 params 是同步对象
  const data = footerItemsMap[params.slug as keyof typeof footerItemsMap];
  console.log("Data:", data);

  if (!data) {
    console.log("Data not found for slug:", params.slug);
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