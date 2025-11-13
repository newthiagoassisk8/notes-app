import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { DataNote } from '@/modules/note/data';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { useState } from 'react';

async function asdf(mockData: DataNote) {
    const url = 'http://192.168.0.27:3000/api/notes/new';
    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(mockData),
        });
        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(`Erro ${res.status}: ${errorData.error || 'Falha ao criar nota.'}`);
        }
        const result = await res.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

export function NewNote() {
    const navigate = useNavigate();

    const storedNotes = localStorage.getItem('notes');
    const [isLoading, setIsLoading] = useState(false);
    const notes = storedNotes ? (JSON.parse(storedNotes) as DataNote[]) : [];

    const handleAddNote = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            setIsLoading(true);
            const formData = new FormData(event.currentTarget);
            const title = formData.get('title')?.toString();
            const content = formData.get('content')?.toString();
            if (!title) return;
            if (!content) return;

            const newNote: DataNote = {
                id: notes[notes.length - 1]?.id + 1 || '1',
                title,
                content,
                isDone: false,
                createdDate: new Date(),
            };
            await asdf(newNote);

            const updatedNotes = [...notes, newNote];

            localStorage.setItem('notes', JSON.stringify(updatedNotes));

            navigate(`/notes/${newNote.id}`);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1 className="flex items-center justify-center text-2xl font-bold">Create New Note</h1>
            <section className="mx-auto mt-8 max-w-md">
                <Card>
                    <CardHeader>
                        <CardTitle>Add Note</CardTitle>
                        <CardDescription>Fill in the details below to add a new note.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddNote} method="post" className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="note-name">Note Name</Label>
                                <Input id="note-name" name="title" placeholder="Note name" required />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Label htmlFor="note-description">Description</Label>
                                <Textarea
                                    id="note-description"
                                    name="content"
                                    placeholder="Note description"
                                    required
                                />
                            </div>

                            {isLoading ? (
                                'Carregando'
                            ) : (
                                <Button type="submit" className="self-end">
                                    Add Note
                                </Button>
                            )}
                        </form>
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
