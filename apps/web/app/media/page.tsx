'use client';

import { useEffect, useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface Media {
  id: string;
  type: string;
  url: string;
  title?: string;
}

export default function MediaPage() {
  const [items, setItems] = useState<Media[]>([]);
  const [type, setType] = useState('image');
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/media`).then(res => res.json()).then(data => setItems(data));
  }, []);

  const addMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ owner_id: 'me', type, url, title })
    });
    const media = await res.json();
    setItems([...items, media]);
    setUrl('');
    setTitle('');
  };

  return (
    <main>
      <h1>Media</h1>
      <form onSubmit={addMedia} style={{ marginBottom: '1rem' }}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <input value={url} onChange={e => setUrl(e.target.value)} placeholder="URL" />
        <select value={type} onChange={e => setType(e.target.value)}>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
        <button type="submit">Upload</button>
      </form>
      <ul>
        {items.map(m => (
          <li key={m.id} style={{ marginBottom: '1rem' }}>
            {m.type === 'image' ? (
              <img src={m.url} alt={m.title} width={200} />
            ) : (
              <video src={m.url} width={250} controls />
            )}
            <div>{m.title}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
