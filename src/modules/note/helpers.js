const API_URL = import.meta.env.VITE_API_URL;

async function getNotes(page = 1) {
    const url = `${API_URL}/notes?limit=10&page=${page}`;

    try {
        const response = await fetch(url, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error('Erro ao buscar as notas:', error);
    }
}

function memoizeAsync(func) {
    cache = {};
    return async function (...args) {
        key = JSON.stringify(args);
        if (cache[key]) {
            console.log('🔁 Retornando do cache para:', args);
            return cache[key];
        } else {
            console.log('🆕 Fazendo requisição para:', args);
            const result = await func.apply(this, args);
            console.log(this);
            cache[key] = result;
            return result;
        }
    };
}

memoizedGetNotes = memoizeAsync(getNotes);
await memoizedGetNotes(1);
await memoizedGetNotes(1);
