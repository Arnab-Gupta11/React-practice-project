/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
const url = "https://dummyjson.com/products?limit=190";
export const useFetchProducts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(url);
      const result = await res.json();
      setData(result?.products);
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { data, loading };
};
