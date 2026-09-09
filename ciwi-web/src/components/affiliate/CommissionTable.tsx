import type {AffiliateCopy, AffiliateProduct} from "@/content/affiliate";
import {formatPercent} from "@/lib/affiliate";
import {SectionHeading} from "@/components/ui/SectionHeading";

type CommissionTableProps = {
  copy: AffiliateCopy["commission"];
  products: AffiliateProduct[];
};

export function CommissionTable({copy, products}: CommissionTableProps) {
  return (
    <section className="page-section">
      <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
      <div className="surface-card affiliate-table-card">
        <table className="affiliate-table">
          <thead>
            <tr>
              <th>{copy.columns.product}</th>
              <th>{copy.columns.condition}</th>
              <th>{copy.columns.rate}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.slug}>
                <td>{product.name}</td>
                <td>{copy.condition}</td>
                <td>{formatPercent(product.rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="affiliate-footnote">{copy.footnote}</p>
    </section>
  );
}
