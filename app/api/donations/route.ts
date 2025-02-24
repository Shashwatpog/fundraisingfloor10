import { NextResponse } from "next/server";
import connectToDB from "../../lib/mongodb"; 
import Donation from "@/models/Donations";

export async function GET() {
  try {
    await connectToDB();
    
    const totalDonations = await Donation.aggregate([
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    return NextResponse.json({ total: totalDonations[0]?.total || 0 });
  } catch (error) {
    console.error("Error fetching total donations:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

