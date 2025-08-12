import { footerItemsMap } from "@/data/footerItems";
import styles from '../css/singlePage.module.css'
export function generateStaticParams() {
  return Object.keys(footerItemsMap).map((slug) => ({
    slug,
  }));
}

export default function Page({ params }: {
  params: { slug: string };
}) {
  const data = footerItemsMap[params.slug as keyof typeof footerItemsMap];
    console.log(data);
    
  if (!data) {  
    // 404 页面
    // notFound();
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
