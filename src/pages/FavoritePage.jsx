import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Product } from "../components/Product";

export const FavoritePage = () => {
  const [products, setProducts] = useState({});
  const favorites = useSelector((state) => state.favorite.items);

  useEffect(() => {
    setProducts(favorites);
  }, [favorites]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto mb-10">
        <h2 className="text-center text-6xl my-10">FAVORITE PRODUCTS</h2>
        {products.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Product key={product.id} data={product} />
            ))}
          </div>
        ) : (
          <div className="container text-center mx-auto">
            <div className="bg-white py-10 my-52 text-4xl">
              <h1>You haven't marked any products as favorites yet!</h1>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};
