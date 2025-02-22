

import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
  donorName: { type: String, required: false },
  amount: { type: Number, required: true },
  message: { type: String, required: false },
  paymentIntentId: { type: String, required: true },
}, { timestamps: true });

export default mongoose.models.Donation || mongoose.model("Donation", DonationSchema);
