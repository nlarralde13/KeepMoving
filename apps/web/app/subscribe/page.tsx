'use client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function SubscribePage() {
  const checkout = async () => {
    const res = await fetch(`${API_URL}/billing/checkout-session`, { method: 'POST' });
    const data = await res.json();
    window.location.href = `https://checkout.stripe.com/pay/${data.sessionId}`;
  };

  return (
    <main>
      <h1>Subscribe</h1>
      <button onClick={checkout}>Checkout</button>
    </main>
  );
}
