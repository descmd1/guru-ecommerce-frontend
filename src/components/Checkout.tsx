import React, { useEffect, useState } from "react";
import { CartItem } from "../type";

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cart");
        const data: CartItem[] = await response.json();
        setCartItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const total = cartItems.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    fetch("http://localhost:5000/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ items: cartItems }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.log(e.error);
      });
  };

  return (
    <div className="p-6 shadow-md rounded-md w-3/4 ml-32 mt-8">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <div className="mb-4">
        {cartItems.map((item) => (
          <div
            key={item.productId._id}
            className="flex justify-between mb-2 text-blue-500"
          >
            <div>{item.productId.name}</div>
            <div>
              ${item.productId.price} x {item.quantity}
            </div>
          </div>
        ))}
      </div>
      <div className="text-xl font-bold mb-4 text-green-500">
        Total: ${total}
      </div>
      <button
        onClick={handleCheckout}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
