
import { NextResponse } from "next/server";
import connectToDB from "../../lib/mongodb";
import Donation from "../../../models/Donations";

export async function GET(req: Request) {
  await connectToDB();
  try {
    const donations = await Donation.find().sort({ amount: -1 }).limit(1000);
    return NextResponse.json(donations);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json({ error: "Failed to fetch leaderboard" }, { status: 500 });
  }
}

