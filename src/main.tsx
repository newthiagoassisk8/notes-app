import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { About } from './routes/about.tsx';
import { Navbar } from './components/shared/navbar.tsx';
import { NoteId } from './routes/note-id.tsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { NewNote } from './routes/new-note.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Navbar />

        <QueryClientProvider client={queryClient}>
            <Routes>
                <Route index element={<App />} />
                <Route path="about" element={<About />} />
                <Route path="notes/:id" element={<NoteId />} />
                <Route path="notes/new" element={<NewNote />} />
            </Routes>
        </QueryClientProvider>
    </BrowserRouter>
);
