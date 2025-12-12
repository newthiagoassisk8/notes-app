


import { dataNotes, type DataNote } from '@/modules/note/data';
import { useEffect, useMemo, useState } from 'react';
import SimplePagination from '@/components/shared/custom-pagination';
import { BadgeList } from '@/components/shared/badge-list';
import { deleteNote, getNotes } from './integrations/api';
import { Input } from './components/ui/input';
import { useQuery } from '@tanstack/react-query';
import { Notes } from './components/shared/notes-query';

//  TODO:  Em uma aplicação React com react-router-dom, a tela principal deve carregar seus dados apenas uma vez. Quando o usuário sai dessa tela e depois retorna por outro fluxo de navegação, o estado/dados da tela devem continuar os mesmos, sem novo carregamento nem perda de alterações locais.
// TODO aplicar filtro com paginação no scroll

type TagItem = {
    tags: string[];
};


export function App() {
    const [page, setPage] = useState<number>(1);

    const { data: allInfo, isFetching, isSuccess } = useQuery({
        queryKey: ['notes', page],
        queryFn: () => getNotes({ page: page }),

    });

    useEffect(() => {
        if (isSuccess && allInfo) {

            localStorage.setItem('notes', JSON.stringify(allInfo))
        }


    }, [isSuccess, allInfo])

    //  console.log(typeof allInfo)

    //    console.log("data " + JSON.stringify(allInfo))
    //    console.log(typeof allInfo)
    const [notes, setNotes] = useState<DataNote[]>([allInfo?.data]);
    const [error, setError] = useState<string>('');
    const [totalPages, setTotalPages] = useState(2);
    const [search, setSearch] = useState<string>('');
    const [totalTags, setTotalTags] = useState<TagItem[]>([]);

    const filtered = notes.filter(
        (note: DataNote) =>
            note?.title.toLowerCase().includes(search.toLowerCase()) ||
            note?.content?.toLowerCase().includes(search.toLowerCase())
    );



    const uniqueTags = useMemo(() => {
        if (!totalTags) return [];
        const allTags = totalTags.flatMap((item) => item.tags ?? []);
        return Array.from(new Set(allTags));
    }, [totalTags]);

    const asdfUniqueTags = [
        "auto",
        "financeiro",
        "tecnologia",
        "dever",
        "hobbies",
        "estudos",
        "tecnologia",
        "estudos",
        "estudos",
        "tecnologia",
        "tecnologia",
        "tecnologia"
    ]

    const removeNote = async (id: string) => {
        try {
            const updatedNotes = notes.filter((note) => note.id !== id);
            await deleteNote(id);
            setNotes(updatedNotes);
        } catch (error) {
            setError((error as Error)?.message);
        } finally {
        }
    };


    const applyFilter = async (tagValor: string) => {
        try {

            const result = await getNotes({ items: 10, page: 1, tag: tagValor });
            const data = result?.data || [];
            let { totalPages } = result?.meta || {};
            totalPages = !isNaN(Number(totalPages)) ? Number(totalPages) : null;
            setTotalPages(totalPages);

            setNotes(data);
            setError('');
        } catch (error) {
            setError((error as Error)?.message);
        } finally {
        }
    };

    return (
        <div className="flex justify-center">
            <div className="w-full max-w-xl space-y-10 bg-white p-10">
                <h1 className="text-3xl font-bold">Notes App</h1>
                <h6 className="my-5 text-lg font-bold text-orange-500">{error}</h6>
                <SimplePagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
                <Input
                    type="text"
                    placeholder="Buscar a nota..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <BadgeList tags={asdfUniqueTags} onTagClick={(tag) => applyFilter(tag)}></BadgeList>
                <section>
                    <ul className="space-y-2">

                        {isFetching ? (
                            <p>Carregando notas</p>

                        ) : notes.length === 0 ? (
                            <p>Sem notas</p>
                        ) : (
                            filtered.map((note: DataNote) => {
                                return (
                                    <li key={note.id}>
                                        <Notes
                                            id={note.id}
                                            name={note.title}
                                            note={note}
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

