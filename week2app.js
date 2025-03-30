npx create-react-app auction-platform
cd auction-platform
npm install axios socket.io-client react-router-dom
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import io from "socket.io-client";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";

const socket = io("http://localhost:5000");

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    socket.on("bidUpdate", (data) => {
      setProducts((prev) => prev.map((p) => (p._id === data._id ? data : p)));
    });

    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home products={products} socket={socket} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetail socket={socket} />} />
      </Routes>
    </Router>
  );
}

export default App;
