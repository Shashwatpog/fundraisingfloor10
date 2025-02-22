"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Please enter a valid name and donation amount.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: Number(amount) * 100 }), // Convert to cents
    });

    const data = await res.json();
    setLoading(false);

    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Make a Donation</h1>
        <form onSubmit={handleCheckout} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded-md"
            required
          />
          <input
            type="number"
            placeholder="Donation Amount ($)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded-md"
            required
          />
          <textarea
            placeholder="Message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border p-2 rounded-md"
            rows={3}
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-md disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "Donate Now"}
          </button>
        </form>
      </div>
    </div>
  );
}
