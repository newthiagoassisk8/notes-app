import type { DataNote } from "@/modules/note/data";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { Trash } from "lucide-react";

interface NotesProps {
    id: string;
    name: string;
    description: string;
    isDone: boolean;
    onRemove: (id: string) => void;
    createdDate?: string | Date;
    note: DataNote;
}


export function Notes({ id, name, description, onRemove, note }: NotesProps) {
    return (
        <div className="flex justify-between rounded-lg border-2 bg-gray-200 p-4">
            <div>
                <h2 className="text-xl font-semibold">{name}</h2>

                <p>{description}</p>
            </div>

            <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                    <Link to={`/notes/${id}`} state={note}>
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
