import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const { projectDescription, name, email } = await req.json();

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.STRIPE_DEPOSIT_PRICE_ID!,
        quantity: 1,
      },
    ],
    customer_email: email,
    metadata: {
      name,
      projectDescription: projectDescription?.slice(0, 500),
    },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact?deposit=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact?deposit=cancelled`,
  });

  return NextResponse.json({ url: session.url });
}
