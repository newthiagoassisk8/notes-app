import { createRoot } from 'react-dom/client';
import './index.css';
import { App } from './App.tsx';
import { BrowserRouter, Route, Routes } from 'react-router';
import { About } from './routes/about.tsx';
import { Navbar } from './components/shared/navbar.tsx';
import { NoteId } from './routes/note-id.tsx';
import { NewNote } from './routes/new-note.tsx';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Navbar />
        <Routes>
            <Route index element={<App />} />
            <Route path="about" element={<About />} />
            <Route path="notes/:id" element={<NoteId />} />
            <Route path="notes/new" element={<NewNote />} />
        </Routes>
    </BrowserRouter>
);
