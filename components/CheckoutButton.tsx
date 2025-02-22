"use client";
import { useState } from "react";

export default function CheckoutButton() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: 500 }), // cents again idk why
    });

    const data = await res.json();
    setLoading(false);

    if (data.url) {
      window.location.href = data.url; // send em back to stripe checkout
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="bg-blue-500 text-white px-4 py-2 rounded-md"
    >
      {loading ? "Processing..." : "Donate $5"}
    </button>
  );
}
