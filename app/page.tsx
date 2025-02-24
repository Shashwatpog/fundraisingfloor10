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
    <main className="container mx-auto px-4 py-8">
    {/*<div className="min-h-screen flex flex-col items-center justify-center p-4">*/}
      <h1 className="text-4xl font-bold text-center mb-8">Floor 10 Fundraiser</h1>
      <Suspense  fallback={<div>Loading progress...</div>}>
        <ProgressBar currentAmount={currentDonation} goals={donationGoals} />
      </Suspense>
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Make a Donation</h2>
          <DonationForm onDonate={handleDonate} loading={loading} />
        </div>
      </div>
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Top Donors</h2>
        <Suspense fallback={<div>Loading Leaderboard...</div>}>
          <Leaderboard />
        </Suspense>
      </div>
    
    </main>
  );
}
