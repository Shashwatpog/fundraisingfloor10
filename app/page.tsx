"use client";
import { useState } from "react";
import Leaderboard from "../components/Leaderboard";

export default function HomePage() {
  const [donorName, setDonorName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Please enter a valid donation amount");
      return;
    }
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        donorName,
        amount: Number(amount) * 100, 
        message,
      }),
    });
    const data = await res.json();
    setLoading(false);
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Error initiating checkout");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-6">Fundraising Site</h1>
      <form onSubmit={handleDonate} className="flex flex-col gap-4 max-w-md w-full">
        <input
          type="text"
          placeholder="Your Name (optional)"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="number"
          placeholder="Donation Amount ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Message (optional)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 rounded"
          rows={3}
        />
        <button type="submit" disabled={loading} className="bg-blue-500 text-white px-4 py-2 rounded">
          {loading ? "Processing..." : "Donate"}
        </button>
      </form>
      <Leaderboard />
    </div>
  );
}
