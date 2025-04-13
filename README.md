# 🎯 Floor 10 Fundraising Platform

A donation platform built with **Next.js (App Router)**, **Stripe**, **MongoDB**, and **Tailwind CSS**, allowing users to make donations, leave messages, and track progress toward fundraising goals.

This platform was built for Floor 10 of Siddall Hall at the University of Cincinnati to donate to St. Jude Children's Hospital. 

As a Resident Advisor at the University of Cincinnati, this was a small effort from my side to give back to the community :D

Check it out here -> [https://fundraisingfloor10.vercel.app](https://fundraisingfloor10.vercel.app/)

---

## 🚀 Features implemented

- 🧾 Stripe Checkout integration
- 📡 Stripe Webhook to store donation data
- 📊 Live donation progress bar
- 🥇 Leaderboard of top donors
- 🍞 MongoDb integration to store donation data 
---

## 🛠 Tech Stack

- **Frontend**: React, Next.js (App Router), Tailwind CSS, ShadCN UI
- **Backend**: API routes in `/app/api/`
- **Database**: MongoDB (via Mongoose)
- **Payments**: Stripe

---

## 🔐 Environment Variables

Create a `.env.local` file in the root of your project and set the following variables:

```env
# Stripe secret key (from Stripe dashboard)
STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXX

# Stripe webhook signing secret (from Stripe CLI or dashboard-> make sure payment and checkout webhooks are selected while creating the webhook)
STRIPE_WEBHOOK_SECRET= XXXXXXXXXXXXXXXXXXXXXXXX

# Your public Stripe key (used in Checkout if needed)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXXXXXX

# MongoDB connection string (MongoDB Atlas or local instance)
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<dbname>?retryWrites=true&w=majority
```

## 🌐 API Endpoints

| Method | Route              | Description                                        |
|--------|--------------------|----------------------------------------------------|
| POST   | `/api/checkout`    | Create Stripe Checkout session with donation info |
| POST   | `/api/webhook`     | Stripe webhook handler for completed sessions     |
| GET    | `/api/donations`   | Fetch total donations received                    |
| GET    | `/api/leaderboard` | Fetch top donor leaderboard                       |

---

### 🔁 `POST /api/checkout`

 Create Stripe Checkout session with donation info

#### Request Body:
```json
{
  "donorName": "John Doe",
  "amount": 100,
  "message": "test donation"
}
```

### 📩 `POST /api/webhook`

Webhook endpoint used by Stripe to make sure all payment sessions are successful or completed

Triggered event:
- `checkout.session.completed`

Stores the donation in MongoDB using the session metadata

---

### 📊 `GET /api/donations`

Returns the total amount of donations made to date.

#### Response:
```json
{
  "total": 500
}
```

---

### 🏆 `GET /api/leaderboard`

Returns the top donors sorted by amount (descending)

#### Response:
```json
[
  { "donorName": "Shashwat", "amount": 10 },
  { "donorName": "Sam", "amount": 100 }
]
```

---

## 🧪 Stripe Webhook Setup (Development)

### 1. Install Stripe CLI

```bash
npm install -g stripe
```

### 2. Login & Listen to Webhook

```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhook
```

### 3. Copy Webhook Secret

Copy the webhook secret from Stripe CLI output and paste it into your `.env.local` as `STRIPE_WEBHOOK_SECRET`.

---

## 🧱 Database Schema (Mongoose)

### Donation Model

```ts
{
  donorName: { type: String, required: false },
  amount: { type: Number, required: true },
  message: { type: String, required: false },
  paymentIntentId: { type: String, required: true },
}
```

---

## 💳 Testing Stripe Integration with test card

To test the donation flow in development mode, use the following Stripe test card on the Checkout page:

```js
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/34)
CVC: Any 3-digit number (e.g., 123)
ZIP Code: Any 5-digit number (e.g., 12345)
```
💡 Stripe automatically accepts these test card values during test mode — no real money is involved.

---

## 💻 Development

Install dependencies:

```bash
npm install
```

Run in dev mode:

```bash
npm run dev
```

Make sure your `.env.local` is properly set up and MongoDB is accessible.

---

## 📜 License

MIT © 2025

---

## 🙌 Shoutout

All donations go toward **St. Jude Children’s Hospital** ❤️

Currently, the Stripe payment integration is set up to test mode.

If you would like to donate to St. Jude Children's Hospital -> [Donate Here](https://www.stjude.org/donate/donate-to-st-jude.html?sc_icid=header-btn-donate-now) :)
