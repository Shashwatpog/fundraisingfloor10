"use client";
import { useState, useEffect, Suspense } from "react";
import Leaderboard from "../components/Leaderboard";
import ProgressBar from "@/components/ProgressBar";
import DonationForm from "@/components/DonationForm";

export default function HomePage() {
  const [currentDonation, setCurrentDonation] = useState(0);
  const [loading, setLoading] = useState(false);

  const donationGoals = [
    { amount: 100, label: "Face Makeup" },
    { amount: 200, label: "Snowball" },
    { amount: 300, label: "Dye Hair" },
    { amount: 450, label: "Shave Head" },
  ];

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const res = await fetch("/api/donations");
        const data = await res.json();
        setCurrentDonation(data.total);
      } catch (error) {
        console.error("Error fetching total donations:", error);
      }
    };

    fetchDonations();
  }, []);

  const handleDonate = async (donorName: string, amount: number, message: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          donorName,
          amount: amount * 100,
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
    } catch (error) {
      setLoading(false);
      alert("Failed to process donation.");
    }
  };

  return (
    <main className="container mx-auto px-4 py-6 sm:py-8">
      <h1 className="text-3xl text-white sm:text-4xl font-bold text-center mb-6 sm:mb-8">Floor 10 Fundraiser</h1>
      <Suspense  fallback={<div>Loading progress...</div>}>
        <ProgressBar currentAmount={currentDonation} goals={donationGoals} />
      </Suspense>
      <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-xl text-white sm:text-2xl font-semibold mb-3 sm:mb-4">Make a Donation 🙏</h2>
          <DonationForm onDonate={handleDonate} loading={loading} />
        </div>
        <div>
          <h2 className="text-xl text-white sm:text-2xl font-semibold mb-3 sm:mb-4">Donation Leaderboard 🏆</h2>
          <Suspense fallback={<div>Loading Leaderboard...</div>}>
            <Leaderboard />
          </Suspense>
        </div>
      </div>
    
    </main>
  );
}
