'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface Booking {
  id: string;
  client_id: string;
  start_at: string;
  end_at: string;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [clientId, setClientId] = useState('');
  const [startAt, setStartAt] = useState('');
  const [endAt, setEndAt] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/bookings`).then(res => res.json()).then(data => setBookings(data));
  }, []);

  const addBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ client_id: clientId, start_at: startAt, end_at: endAt })
    });
    const booking = await res.json();
    setBookings([...bookings, booking]);
    setClientId('');
    setStartAt('');
    setEndAt('');
  };

  return (
    <main>
      <h1>Bookings</h1>
      <form onSubmit={addBooking} style={{ marginBottom: '1rem' }}>
        <input value={clientId} onChange={e => setClientId(e.target.value)} placeholder="Client ID" />
        <input value={startAt} onChange={e => setStartAt(e.target.value)} placeholder="Start" />
        <input value={endAt} onChange={e => setEndAt(e.target.value)} placeholder="End" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {bookings.map(b => (
          <li key={b.id}>
            {b.client_id}: {b.start_at} - {b.end_at}
          </li>
        ))}
      </ul>
    </main>
  );
}
