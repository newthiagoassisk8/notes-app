
import { useEffect, useState } from 'react'
import { type DataNote } from '@/modules/note/data'
import { getNotes } from '@/integrations/api'

/**
 * Parâmetros de entrada do hook
 */
interface UseNotesParams {
    items?: number
    page: number
    tag?: string
}

/**
 * Retorno do hook
 */
export interface UseNotesReturn {
    isChecking: boolean
    notes: DataNote[] | null | undefined
    error: string | null
    isLoading: boolean
    applyFilter: (tag: string) => void

}

/**
 * Hook para verificar elegibilidade do cliente para Pagaleve
 *
 */
export function useNotes({
    items = 10,
    page = 1,
    tag,
}: UseNotesParams): UseNotesReturn {
    const [notes, setNotes] = useState<DataNote[]>();
    const [isChecking, setIsChecking] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null)
    const [totalPages, setTotalPages] = useState(2);

    /**
     * Executa a verificação de elegibilidade
     */
    const fetchNotes = async (): Promise<void> => {
        // Validação dos dados obrigatórios
        if (!page) {
            setIsChecking(false)
            return
        }


        setIsChecking(true)
        setError(null)

        try {
            setIsLoading(true);
            const result = await getNotes({ items: 10, page: 1, tag: tag });

            const data = result?.data || [];
            setNotes(data);


        } catch (err: any) {
            setError(err?.message ?? 'Erro ao verificar elegibilidade')
            console.error('Erro ao verificar elegibilidade Pagaleve:', err)
        } finally {
            setIsChecking(false)
            setIsLoading(false)
        }
    }

    const applyFilter = async (tag: string) => {

        try {
            const result = await getNotes({ items: 10, page: 1, tag: tag });
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
    }

    /**
     * Efeito para disparar a verificação automática (com debounce)
     */
    useEffect(() => {
        if (page) {
            const timer = setTimeout(() => {
                fetchNotes()
            }, 500)

            return () => clearTimeout(timer)
        }
    }, [page])

    return {
        isChecking,
        notes,
        error,
        isLoading,
        applyFilter
    }
}


