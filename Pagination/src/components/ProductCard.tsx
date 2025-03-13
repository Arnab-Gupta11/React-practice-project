export default function ProductCard({ product }: { product: Record<string, string> }) {
  return (
    <div className="product-card">
      <img src={product.thumbnail} alt={product.title} className="product-img" />
      <h1 className="product-title">{product.title}</h1>
    </div>
  );
}
