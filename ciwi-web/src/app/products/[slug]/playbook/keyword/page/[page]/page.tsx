import SparkPlaybookKeywordIndexPage, {
  generateMetadata,
} from "../../page";
import {products} from "@/content/products";
import {getKeywordUseCaseCategories} from "@/content/shopify-keyword-use-cases";

const CATEGORIES_PER_PAGE = 25;

export {generateMetadata};

export async function generateStaticParams() {
  // getKeywordUseCaseCategories 接收 locale 但分类数量是中英一一对应的，这里传 "en" 做数量估计即可
  const totalCats = getKeywordUseCaseCategories("en").length;
  const totalPages = Math.max(1, Math.ceil(totalCats / CATEGORIES_PER_PAGE));

  const pairs: Array<{slug: string; page: string}> = [];
  for (const product of products) {
    for (let p = 1; p <= totalPages; p++) {
      pairs.push({slug: product.slug, page: String(p)});
    }
  }
  return pairs;
}

export default SparkPlaybookKeywordIndexPage;
