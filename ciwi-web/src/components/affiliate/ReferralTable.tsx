import type {AffiliateCopy, AffiliateProduct, ReferralRecord} from "@/content/affiliate";

type ReferralTableProps = {
  referrals: ReferralRecord[];
  products: AffiliateProduct[];
  copy: AffiliateCopy["dashboard"]["progress"];
};

export function ReferralTable({referrals, products, copy}: ReferralTableProps) {
  function productName(slug: string) {
    return products.find((product) => product.slug === slug)?.name ?? slug;
  }

  return (
    <div className="section-stack">
      <div>
        <h3>{copy.title}</h3>
        <p className="quote">{copy.description}</p>
      </div>

      {referrals.length === 0 ? (
        <p className="quote">{copy.emptyState}</p>
      ) : (
        <div className="surface-card affiliate-table-card">
          <table className="affiliate-table">
            <thead>
              <tr>
                <th>{copy.columns.email}</th>
                <th>{copy.columns.store}</th>
                <th>{copy.columns.product}</th>
                <th>{copy.columns.installed}</th>
                <th>{copy.columns.subscribed}</th>
                <th>{copy.columns.plan}</th>
              </tr>
            </thead>
            <tbody>
              {referrals.map((referral) => (
                <tr key={referral.id}>
                  <td>{referral.email}</td>
                  <td>{referral.storeId ?? "—"}</td>
                  <td>{productName(referral.productSlug)}</td>
                  <td>{referral.installed ? copy.yes : copy.no}</td>
                  <td>{referral.subscribed ? copy.yes : copy.no}</td>
                  <td>{referral.plan ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
