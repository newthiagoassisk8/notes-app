const API_URL = import.meta.env.VITE_API_URL;

export async function getNotes({
    items = 10,
    page = 1,
    tag,
}: {
    items?: number;
    page?: number;
    tag?: string;
}) {
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

        const data = (await res.json()) || {};
        console.log(data);
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getTags(items = 3) {
    const baseUrl = `${API_URL}/notes`;
    const params = new URLSearchParams({
        limit: items.toString(),
        page: '1',
    });

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
