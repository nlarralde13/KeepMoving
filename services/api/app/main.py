from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from uuid import uuid4

app = FastAPI()


class ClientBase(BaseModel):
    name: str
    email: str


class Client(ClientBase):
    id: str


class NoteBase(BaseModel):
    body: str


class Note(NoteBase):
    id: str
    client_id: str


class BookingBase(BaseModel):
    client_id: str
    start_at: str
    end_at: str


class Booking(BookingBase):
    id: str


class MediaBase(BaseModel):
    owner_id: str
    type: str
    url: str
    title: Optional[str] = None
    description: Optional[str] = None


class Media(MediaBase):
    id: str


clients: List[Client] = []
notes: List[Note] = []
bookings: List[Booking] = []
media_items: List[Media] = []


@app.get("/")
def read_root():
    return {"message": "Keep Moving API"}


@app.get("/clients", response_model=List[Client])
def list_clients():
    return clients


@app.post("/clients", response_model=Client)
def create_client(payload: ClientBase):
    client = Client(id=str(uuid4()), **payload.dict())
    clients.append(client)
    return client


@app.get("/clients/{client_id}", response_model=Client)
def get_client(client_id: str):
    for c in clients:
        if c.id == client_id:
            return c
    raise HTTPException(status_code=404, detail="Client not found")


@app.get("/clients/{client_id}/notes", response_model=List[Note])
def list_notes(client_id: str):
    return [n for n in notes if n.client_id == client_id]


@app.post("/clients/{client_id}/notes", response_model=Note)
def add_note(client_id: str, payload: NoteBase):
    if not any(c.id == client_id for c in clients):
        raise HTTPException(status_code=404, detail="Client not found")
    note = Note(id=str(uuid4()), client_id=client_id, **payload.dict())
    notes.append(note)
    return note


@app.get("/bookings", response_model=List[Booking])
def list_bookings():
    return bookings


@app.post("/bookings", response_model=Booking)
def create_booking(payload: BookingBase):
    booking = Booking(id=str(uuid4()), **payload.dict())
    bookings.append(booking)
    return booking


@app.post("/billing/checkout-session")
def checkout_session():
    return {"sessionId": "fake_session"}


@app.get("/media", response_model=List[Media])
def list_media():
    return media_items


@app.post("/media", response_model=Media)
def create_media(payload: MediaBase):
    media = Media(id=str(uuid4()), **payload.dict())
    media_items.append(media)
    return media


@app.get("/media/{media_id}", response_model=Media)
def get_media(media_id: str):
    for m in media_items:
        if m.id == media_id:
            return m
    raise HTTPException(status_code=404, detail="Media not found")


@app.delete("/media/{media_id}")
def delete_media(media_id: str):
    global media_items
    media_items = [m for m in media_items if m.id != media_id]
    return {"ok": True}
