import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { fetchCategories } from '../redux/reducers/categoriesSlice';

export const Navbar = () => {
  const navigate = useNavigate();
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [localStorage.firstname, dispatch]);

  return (
    <div className="navbar bg-base-100 shadow-xl">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to={`/products`}>ALL</Link>
            </li>
            {categories.map((category) => (
              <li key={category}>
                <Link to={`/products/${category}`}>
                  {category.toUpperCase()}
                </Link>
              </li>
            ))}
            <li>
              <Link to={`/favorite`}>FAVORITES</Link>
            </li>
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost normal-case text-xl">
          ShopLane
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to={`/products`}>ALL</Link>
          </li>
          {categories.map((category) => (
            <li key={category}>
              <Link to={`/products/${category}`}>{category.toUpperCase()}</Link>
            </li>
          ))}
          <li>
            <Link to={`/favorite`}>FAVORITES</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="flex gap-4">
          <Link to="/cart" className="btn btn-ghost">
            <FontAwesomeIcon
              icon={faCartShopping}
              style={{ color: "#9400ff" }}
            />
          </Link>
          {localStorage.firstname ? (
            <ul className="menu menu-horizontal px-1">
              <li tabIndex={0}>
                <a className="btn btn-primary mr-2 rounded-xl">
                  Welcome {localStorage.firstname}!
                  <svg
                    className="fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </a>
                <ul className="p-2">
                  <li>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        localStorage.removeItem("firstname");
                        navigate("/");
                      }}
                    >
                      SignOut
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          ) : (
            <Link to="/register" className="btn btn-primary mr-2">
              Login/Register
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
