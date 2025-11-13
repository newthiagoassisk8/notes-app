import type { DataNote } from '@/modules/note/data';
import { useParams } from 'react-router';

export function NoteId() {
    const params = useParams();

    const id = params.id;

    const storedNotes = localStorage.getItem('notes');
    const notes = storedNotes ? (JSON.parse(storedNotes) as DataNote[]) : [];

    const note = notes.find((note) => note.id === id);

    if (!note) {
        return (
            <div>
                <p>Sorry, we couldn't find the note you're looking for.</p>
            </div>
        );
    }

    return (
        <div>
            <h1> {note.title}</h1>
            <p> {note.content}</p>
        </div>
    );
}
