import { useState, useEffect } from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Endpoints } from "../api/Endpoints";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AddToCart } from "../redux/reducers/cartSlice";

export const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});

  const fetchData = async () => {
    const response = await axios.get(Endpoints.PRODUCT_ID + id);
    setProduct(response.data);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <>
      <Navbar />
      {product && product.rating && (
        <>
          <div className="container card lg:card-side bg-base-100 shadow-xl mx-auto max-w-screen-lg my-10">
            <figure>
              <img
                src={product.image}
                alt={product.title}
                className="max-h-screen min-w-72 object-fill"
              />
            </figure>
            <div className="card-body">
              <h5 className="card-title text-2xl">{product.title}</h5>
              <p>{product.description}</p>
              <div className="badge badge-secondary">{product.category}</div>
              <div className="text-sm">
                {product.rating.rate} out of 5 ({product.rating.count})
              </div>
              <p className="text-lg">&#8377;{product.price.toFixed(2)}</p>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => dispatch(AddToCart(product))}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  );
};
