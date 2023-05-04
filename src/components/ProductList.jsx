import { useState, useEffect } from "react";
import axios from "axios";
import { Product } from "./Product";
import { Endpoints } from "../api/Endpoints";
import { useParams } from "react-router-dom";

export const ProductList = () => {
  const { catId } = useParams();
  const [products, setProducts] = useState([]);

  const fetchData = async () => {
    const url = catId ? Endpoints.PRODUCT_CATID + catId : Endpoints.PRODUCT_ID;
    try {
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [catId]);

  return (
    <div className="container mx-auto mb-10">
      <h2 className="text-center text-6xl my-10">{catId ? catId.toUpperCase() : 'ALL PRODUCTS'}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <Product key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};
