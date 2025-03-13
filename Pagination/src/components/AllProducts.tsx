import { useFetchProducts } from "../hooks/useFetchPrducts";
import ProductCard from "./ProductCard";

export default function AllProduct() {
  const { data, loading } = useFetchProducts();
  return (
    <div className="all-product-container">
      {loading ? (
        <>
          <h1>Loading...</h1>
        </>
      ) : (
        <>
          {data?.length > 0 ? (
            <div className="product-container">
              {data.map((product: Record<string, string>) => (
                <ProductCard key={product?.id} product={product} />
              ))}
            </div>
          ) : (
            <>
              {" "}
              <h1>No Product Availble</h1>
            </>
          )}
        </>
      )}
    </div>
  );
}
