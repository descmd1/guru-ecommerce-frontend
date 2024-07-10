import React, { useEffect, useState } from "react";
import { Product } from "../type";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId: string, quantity = 1) => {
    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }),
      });

      const data = await response.json();
      console.log("Item added to cart:", data);
      Swal.fire({
        text: "Added to cart",
        timer: 2000,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className=" w-screen md:p-6 md:w-2/3 justify-center md:ml-60 p-5 items-center flex-col md:flex">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="md:grid md:grid-cols-3 gap-4  flex flex-col items-center justify-between">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded bg-slate-100">
            <Link to={`/products/${product._id}`}>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="mb-2 w-full h-1/2"
              />
              <h2 className="text-lg font-bold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-2">${product.price}</p>
            </Link>
            <button
              onClick={() => addToCart(product._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div className=" flex gap-8 justify-between w-full md:w-3/4 mt-5">
        <Link to="/cart">
          <button className="text-slate-50 shadow-md rounded-md border items-center py-2 px-2 text-md bg-green-700">
            Go to cart
          </button>
        </Link>
        <Link to="/admin">
          <button className="text-slate-50 shadow-md rounded-md border items-center py-2 px-2 text-md bg-green-700">
            Post product
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductList;
