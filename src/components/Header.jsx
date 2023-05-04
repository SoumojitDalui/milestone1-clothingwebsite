import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage: `url("/hero_bg.jpg")`,
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Welcome to one stop shop for all your fashion need</h1>
          <Link to="/products" className="btn btn-primary">Start Shopping</Link>
        </div>
      </div>
    </div>
  );
};
