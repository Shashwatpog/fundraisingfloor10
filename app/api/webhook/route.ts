import { NextResponse } from "next/server";
import Stripe from "stripe";
import connectToDB from "../../lib/mongodb";
import Donation from "../../../models/Donations";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-01-27.acacia" });
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Webhook Error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const { donorName, message } = session.metadata || {};
    const amount = session.amount_total ? session.amount_total / 100 : 0;
    const paymentIntentId = session.payment_intent as string;

    console.log("Received checkout session:", session);
    console.log(`Donor Name: ${donorName}, Message: ${message}, Amount: ${amount}`);

    await connectToDB();

    try {
      const donation = await Donation.create({ donorName, amount, message, paymentIntentId });
      console.log(`Stored donation: ${donation}`);
    } catch (error) {
      console.error("Error storing donation in DB:", error);
    }
  }

  return NextResponse.json({ received: true });
}
