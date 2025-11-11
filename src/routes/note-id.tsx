import type { DataNote } from '@/modules/note/data';
import { useParams } from 'react-router';

export function NoteId() {
    const params = useParams();

    console.log(params);

    const id = params.id;
    console.log('id');
    console.log(id);

    const storedNotes = localStorage.getItem('notes');
    const notes = storedNotes ? (JSON.parse(storedNotes) as DataNote[]) : [];

    const note = notes.find((note) => note.id === id);

    console.log(notes.find((note) => note.id === id));

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
