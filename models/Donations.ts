import mongoose, { Schema, models } from "mongoose";

const DonationSchema = new Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    message: { type: String, required: false },
    paymentIntentId: { type: String, required: true }, // Track Stripe PaymentIntent ID
  },
  { timestamps: true }
);

export const Donation = models.Donation || mongoose.model("Donation", DonationSchema);
