import { Button } from '@/components/ui/button';

import { Trash } from 'lucide-react';

import { dataNotes, type DataNote } from '@/modules/note/data';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

async function getData() {
    const url = 'http://192.168.0.27:3000/api/notes';
    try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
        }
        const result = await res.json();
        localStorage.setItem('notes', JSON.stringify(result.data));
        return result;
    } catch (error) {
        console.error(error);
    }
}

export function App() {
    const [notes, setNotes] = useState(() => {
        const storedNotes = localStorage.getItem('notes');
        return storedNotes ? (JSON.parse(storedNotes) as DataNote[]) : dataNotes;
    });
    console.log(notes);

    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
        getData();
    });

    const removeNote = (id: string) => {
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
    };

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-xl space-y-10 bg-white p-10">
                <h1 className="text-3xl font-bold">Notes App</h1>

                <section>
                    <ul className="space-y-2">
                        {notes.length === 0 ? (
                            <p>Sem notas</p>
                        ):(
                            notes.map((note) => {
                                return (
                                    <li key={note.id}>
                                        <Notes
                                            id={note.id}
                                            name={note.title}
                                            description={note.content ?? ''}
                                            isDone={note.isDone}
                                            onRemove={removeNote}
                                            createdDate={note.createdDate}
                                        />
                                    </li>
                                );
                            })
                        )}
                    </ul>
                </section>
            </div>
        </div>
    );
}

interface NotesProps {
    id: string;
    name: string;
    description: string;
    isDone: boolean;
    onRemove: (id: string) => void;
    createdDate?: string | Date;
}

export function Notes({ id, name, description,  onRemove }: NotesProps) {
    return (
        <div className="flex justify-between rounded-lg border-2 bg-gray-200 p-4">
            <div>
                <h2 className="text-xl font-semibold">
                    {name}
                </h2>

                <p>{description}</p>


            </div>

            <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                    <Link to={`/notes/${id}`}>View</Link>
                </Button>
                <Button variant="destructive" size="icon-sm" onClick={() => onRemove(id)}>
                    <Trash />
                </Button>
            </div>
        </div>
    );
}
