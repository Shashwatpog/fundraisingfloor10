import { useEffect, useState } from "react";

const Leaderboard = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/leaderboard");
        const data = await response.json();
        setDonations(data);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
      }
    };

    fetchLeaderboard();
  }, []);

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold">Leaderboard</h2>
      <ul className="list-disc pl-5 mt-4">
        {donations.map((donation, index) => (
          <li key={donation._id} className="mb-2">
            <strong>{index + 1}. </strong>
            {donation.donorName || "Anonymous"} - ${donation.amount}
            {donation.message && ` – ${donation.message}`}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
