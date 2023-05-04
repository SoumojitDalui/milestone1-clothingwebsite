import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
} from "../redux/reducers/favoritesSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export const Product = (props) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorite.items);

  const isFavorite = favorites.some((favorite) => favorite.id === props.data.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(props.data));
    } else {
      dispatch(addToFavorites(props.data));
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <button
        className={`absolute top-2 right-2 transition-colors ${
          isFavorite && favorites.length > 0 ? "text-red-500" : "text-black"
        }`}
        onClick={handleFavoriteClick}
      >
        <FontAwesomeIcon icon={faHeart} size="xl" className="mr-1 mt-1" />
      </button>
      <figure>
        <img
          src={props.data.image}
          alt={props.data.title}
          className="max-w-80 h-72 object-fill"
        />
      </figure>
      <div className="card-body">
        <h5 className="card-title line-clamp-1">{props.data.title}</h5>
        <div className="badge badge-secondary">{props.data.category}</div>
        <div className="text-sm">
          {props.data.rating.rate} out of 5 ({props.data.rating.count})
        </div>
        <p className="text-lg">&#8377;{props.data.price.toFixed(2)}</p>
        <Link
          to={`/products/detail/${props.data.id}`}
          className="justify-end card-actions"
        >
          <button className="btn btn-primary w-full">Show Details</button>
        </Link>
      </div>
    </div>
  );
};
