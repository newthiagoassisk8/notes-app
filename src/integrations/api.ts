const API_URL = import.meta.env.VITE_API_URL;

export async function getNotes(items = 3, page = 1, tag?: string) {
    const baseUrl = `${API_URL}/notes`;
    const params = new URLSearchParams({
        limit: items.toString(),
        page: page.toString(),
    });

    if (tag) params.append('tag', tag);

    try {
        const res = await fetch(`${baseUrl}?${params.toString()}`);

        if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
        }

        const result = await res.json();
        return result || {};
    } catch (error) {
        console.error(error);
    }
}

export async function deleteNote(id: string) {
    try {
        const baseUrl = `${API_URL}/notes`;
        const res = await fetch(`${baseUrl}/${id}`, {
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
