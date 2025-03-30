import React from "react";
import { Link } from "react-router-dom";

const Home = ({ products, socket }) => {
  return (
    <div>
      <h1>Auctions</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <Link to={`/product/${product._id}`}>{product.name}</Link> - Current Bid: ${product.currentBid}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
