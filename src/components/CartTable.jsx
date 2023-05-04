import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RemoveFromCart,
  AddQuantity,
  SubtractQuantity,
} from "../redux/reducers/cartSlice";

export const CartTable = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState({});
  const [total, setTotal] = useState(0);

  const items = useSelector((state) => state.cart.items);

  useEffect(() => {
    const newProducts = items.map((item) => ({
      ...item,
    }));
    setProducts(newProducts);
    const totalPrice = newProducts.reduce((acc, curr) => {
      return acc + curr.price * curr.quantity;
    }, 0)
    setTotal(totalPrice);
  }, [items]);

  return (
    <>
      <div className="container mx-auto mb-10">
        <h1 className="text-center text-6xl my-10">Cart Table</h1>
        {products.length ? (
          <>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} id={product.id}>
                    <td>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-32 h-32"
                      />
                    </td>
                    <td>{product.title}</td>
                    <td>{product.price.toFixed(2)}</td>
                    <td>
                      <div className="flex gap-4">
                        <button
                          className="btn btn-primary"
                          onClick={() => dispatch(AddQuantity(product.id))}
                        >
                          +
                        </button>
                        <span className="item-center align-middle self-center text-xl">
                          {product.quantity}
                        </span>
                        <button
                          className="btn btn-primary"
                          onClick={() => {
                            if(product.quantity > 1) {
                              dispatch(SubtractQuantity(product.id))
                            } else {
                              dispatch(RemoveFromCart(product.id))
                            }
                          }}
                        >
                          -
                        </button>
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-error"
                        onClick={() => dispatch(RemoveFromCart(product.id))}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <hr />
          <div className="flex justify-end mx-auto mt-2 text-3xl">
            <h1>Total: {total.toFixed(2)}</h1>
          </div>
          </>
        ) : (
          <div className="container text-center mx-auto">
            <div className="bg-white py-10 my-52 text-4xl">
              <h1>Add some items to your cart!</h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
