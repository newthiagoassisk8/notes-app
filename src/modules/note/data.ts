export type DataNote = {
    id: string;
    title: string;
    isDone?: boolean;
    content?: string;
    tags: string[],
    createdDate?: string | Date;

    createdAt?: string | Date;
    updatedAt?: string | Date;
};


export const dataNotes: DataNote[] = [
    {
        "id": "976695ac-74bc-40cc-b22a-0ed0266cc1ef",
        "title": "Nota 1",
        "content": "Auto 1",
        "tags": [
            "auto"
        ],
        "createdAt": "2025-11-23T02:49:34.001Z",
        "updatedAt": "2025-11-23T02:49:34.001Z"
    },
    {
        "id": "0892593e-29fe-4d7f-bfcc-fe9a62b228e5",
        "title": "Minha nota adiiconada pelo celuar",
        "content": "Conteúdo da nota",
        "tags": [],
        "createdAt": "2025-11-23T02:21:19.840Z",
        "updatedAt": "2025-11-23T02:21:19.840Z"
    },
    {
        "id": "fb9a1346-3c56-4a54-921c-6ac960d107e9",
        "title": "Revisar gastos do mes",
        "content": "ajustar orcamento pro mes que vem",
        "tags": [
            "financeiro"
        ],
        "createdAt": "2025-11-22T18:29:22.331Z",
        "updatedAt": "2025-11-22T18:29:22.331Z"
    },
    {
        "id": "05ff0b68-90a3-4f66-8b24-7080a085ee39",
        "title": "apresentar minha solucao de notas",
        "content": "gravar o video para flly ia",
        "tags": [
            "tecnologia",
            "dever"
        ],
        "createdAt": "2025-11-22T17:56:42.238Z",
        "updatedAt": "2025-11-22T17:56:42.238Z"
    },
    {
        "id": "64d74645-22ec-4e42-8d7f-cc576acfd97a",
        "title": "Assistir recomendacao do Victor It a coisa serisdo",
        "content": "E",
        "tags": [
            "hobbies"
        ],
        "createdAt": "2025-11-22T17:51:48.684Z",
        "updatedAt": "2025-11-22T17:51:48.684Z"
    },
    {
        "id": "6da79d46-cbf1-497c-96fc-ddafd47d2a50",
        "title": "Praticar Neovim",
        "content": "Explorar comandos básicos, plugins e configurar atalhos para produtividade.",
        "tags": [
            "estudos",
            "tecnologia"
        ],
        "createdAt": "2025-11-22T17:18:20.682Z",
        "updatedAt": "2025-11-22T17:18:20.682Z"
    },
    {
        "id": "43ce7b30-c262-4025-9aec-da99811917ab",
        "title": "Estudar eventos no frontend JS",
        "content": "Revisar event bubbling, capturing, e delegation no JavaScript.",
        "tags": [
            "estudos"
        ],
        "createdAt": "2025-11-22T17:18:02.824Z",
        "updatedAt": "2025-11-22T17:18:02.824Z"
    },
    {
        "id": "f2841b8e-896d-4aae-a3b7-8c2a13be4930",
        "title": "Estudar conceito SSR",
        "content": "Entender como funciona o Server-Side Rendering em frameworks como Next.js e Nuxt.",
        "tags": [
            "estudos",
            "tecnologia"
        ],
        "createdAt": "2025-11-22T17:17:43.939Z",
        "updatedAt": "2025-11-22T17:17:43.939Z"
    },
    {
        "id": "b05138f9-8200-4197-b3f3-db38bf673a7d",
        "title": "Estudar o que é e como funciona a passkey",
        "content": "-",
        "tags": [
            "tecnologia"
        ],
        "createdAt": "2025-11-22T17:02:10.589Z",
        "updatedAt": "2025-11-22T17:02:10.589Z"
    },
    {
        "id": "e436d993-6eb0-4fc5-bf5d-916f50f80c22",
        "title": "Testar o Mise",
        "content": "Avaliar se vale a troca do ASDF para o Mise e comparar desempenho e usabilidade.",
        "tags": [
            "tecnologia"
        ],
        "createdAt": "2025-11-22T17:01:26.079Z",
        "updatedAt": "2025-11-22T17:01:26.079Z"
    }
];

