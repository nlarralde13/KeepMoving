'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface Client {
  id: string;
  name: string;
  email: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState<Record<string, string[]>>({});
  const [noteInput, setNoteInput] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`${API_URL}/clients`).then(res => res.json()).then(data => setClients(data));
  }, []);

  useEffect(() => {
    clients.forEach(c => {
      fetch(`${API_URL}/clients/${c.id}/notes`).then(res => res.json()).then(data => {
        setNotes(prev => ({ ...prev, [c.id]: data.map((n: any) => n.body) }));
      });
    });
  }, [clients]);

  const addClient = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email })
    });
    const client = await res.json();
    setClients([...clients, client]);
    setName('');
    setEmail('');
  };

  const addNote = async (clientId: string) => {
    const body = noteInput[clientId] || '';
    const res = await fetch(`${API_URL}/clients/${clientId}/notes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body })
    });
    const note = await res.json();
    setNotes({ ...notes, [clientId]: [...(notes[clientId] || []), note.body] });
    setNoteInput({ ...noteInput, [clientId]: '' });
  };

  return (
    <main>
      <h1>Clients</h1>
      <form onSubmit={addClient} style={{ marginBottom: '1rem' }}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <button type="submit">Add</button>
      </form>
      <ul>
        {clients.map(c => (
          <li key={c.id} style={{ marginBottom: '1rem' }}>
            <strong>{c.name}</strong> ({c.email})
            <ul>
              {(notes[c.id] || []).map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
            <input
              value={noteInput[c.id] || ''}
              onChange={e => setNoteInput({ ...noteInput, [c.id]: e.target.value })}
              placeholder="New note"
            />
            <button onClick={() => addNote(c.id)}>Add Note</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
