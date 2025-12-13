export type DataNote = {
    id: string;
    title: string;
    isDone?: boolean;
    content?: string;
    tags: string[];
    createdDate?: string | Date;

    createdAt?: string | Date;
    updatedAt?: string | Date;
};

export const dataNotes: DataNote[] = [

];
