import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Product } from "../type";
import Swal from "sweetalert2";

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
    Swal.fire({
      text: "Item added to cart",
      timer: 2000,
    });
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <div className="md:p-6 md:w-2/6 w-screen p-5 flex flex-col border shadow-md align-middle justify-center bg-slate-100 md:m-auto mt-6">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="mb-2 w-full"
        />
        <h2 className="text-lg font-bold mb-2">{product.name}</h2>
        <p className="text-gray-700 mb-2">${product.price}</p>
        <p className="text-lg mb-4">{product.description}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => handleAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
      <div className="items-center flex justify-center w-full mt-5">
        <Link to="/">
          <button className="text-slate-50 shadow-md rounded-md border items-center py-2 px-2 text-md bg-green-700">
            Back
          </button>
        </Link>
      </div>
    </>
  );
};

export default ProductDetails;
