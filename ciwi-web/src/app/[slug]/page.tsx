import { footerItemsMap } from "@/data/footerItems";
import styles from '../css/singlePage.module.css'
import { notFound } from "next/navigation"; // 导入 notFound

// 导入 Next.js 的 PageProps 类型
import PageProps from "next";

export function generateStaticParams() {
  return Object.keys(footerItemsMap).map((slug) => ({
    slug,
  }));
}
// 扩展 Next.js 的 PageProps 类型
interface CustomPageProps extends Omit<typeof PageProps, "params"> {
  params: {
    slug: string;
  };
}

export default function Page({ params }: CustomPageProps) {
  const data = footerItemsMap[params.slug as keyof typeof footerItemsMap];
    console.log(data);
    
  if (!data) {  
    // 404 页面
    notFound();
    console.log('....');
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
