import { Button } from '@/components/ui/button';

import { Trash } from 'lucide-react';

import { type DataNote } from '@/modules/note/data';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import SimplePagination from '@/components/shared/custom-pagination';

// TODO aplicar filtro com paginação no scroll
async function getNotes(items = 3, page = 1) {
    const url = 'http://192.168.0.27:3000/api/notes';

    try {
        const res = await fetch(`${url}?limit=${items}&page=${page}`);

        if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
        }
        const result = await res.json();

        return result.data;
    } catch (error) {
        console.error(error);
    }
}

async function deleteNote(id: string) {
    try {
        const res = await fetch(`http://192.168.0.27:3000/api/notes/${id}`, {
            method: 'DELETE',
        });
        if (!res.ok) {
            throw new Error(`Erro ao deletar: ${res.status}`);
        }
        return;
    } catch (error) {
        console.log(error);
    }
}

export function App() {
    const [notes, setNotes] = useState<DataNote[]>([]);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    const total = 10;

    useEffect(() => {
        async function fetchNotes() {
            try {
                setIsLoading(true);

                const data = await getNotes(10, page);

                setNotes(data);
                setError('');
            } catch (error) {
                setError((error as Error)?.message);
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchNotes();
    }, [page]);

    const removeNote = async (id: string) => {
        try {
            setIsLoading(true);
            const updatedNotes = notes.filter((note) => note.id !== id);
            await deleteNote(id);
            setNotes(updatedNotes);
        } catch (error) {
            setError((error as Error)?.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-xl space-y-10 bg-white p-10">
                <h1 className="text-3xl font-bold">Notes App</h1>
                <h6 className="text-lg my-5 text-orange-500 font-bold">{error}</h6>
                <SimplePagination currentPage={page} totalPages={total} onPageChange={setPage} />

                <section>
                    <ul className="space-y-2">
                        {isLoading ? (
                            <p>Carregando notas</p>
                        ) : notes.length === 0 ? (
                            <p>Sem notas</p>
                        ) : (
                            notes.map((note) => {
                                return (
                                    <li key={note.id}>
                                        <Notes
                                            id={note.id}
                                            name={note.title}
                                            notes={note}
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
    notes: DataNote;
}

export function Notes({ id, name, description, onRemove, notes }: NotesProps) {
    return (
        <div className="flex justify-between rounded-lg border-2 bg-gray-200 p-4">
            <div>
                <h2 className="text-xl font-semibold">{name}</h2>

                <p>{description}</p>
            </div>

            <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                    <Link to={`/notes/${id}`} state={notes}>
                        View
                    </Link>
                </Button>
                <Button variant="destructive" size="icon-sm" onClick={() => onRemove(id)}>
                    <Trash />
                </Button>
            </div>
        </div>
    );
}
