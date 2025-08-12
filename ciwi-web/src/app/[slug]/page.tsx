import { footerItemsMap } from "@/data/footerItems";
import styles from "../css/singlePage.module.css";
import { notFound } from "next/navigation";

// 移除不必要的 PageProps 导入和自定义接口，直接使用推导类型
export function generateStaticParams() {
  return Object.keys(footerItemsMap).map((slug) => ({
    slug,
  }));
}

// 让 TypeScript 自动推导 params 类型
export default function Page({ params }: { params: { slug: string } }) {
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