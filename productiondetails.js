import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetail = ({ socket }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [bidAmount, setBidAmount] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`).then((res) => setProduct(res.data));
  }, [id]);

  const handleBid = () => {
    if (bidAmount > product.currentBid) {
      socket.emit("bid", { ...product, currentBid: bidAmount });
    }
  };

  return (
    <div>
      <h1>{product?.name}</h1>
      <p>{product?.description}</p>
      <p>Current Bid: ${product?.currentBid}</p>
      <input type="number" value={bidAmount} onChange={(e) => setBidAmount(Number(e.target.value))} />
      <button onClick={handleBid}>Place Bid</button>
    </div>
  );
};

export default ProductDetail;
