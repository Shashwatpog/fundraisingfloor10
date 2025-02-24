"use client";
import { useState } from "react";

interface DonationFormProps {
  onDonate: (donorName: string, amount: number, message: string) => void;
  loading: boolean;
}

const DonationForm: React.FC<DonationFormProps> = ({ onDonate, loading }) => {
  const [donorName, setDonorName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      alert("Please enter a valid donation amount");
      return;
    }
    onDonate(donorName, Number(amount), message);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md w-full mt-6">
      <input
        type="text"
        placeholder="Your Name"
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
  );
};

export default DonationForm;
