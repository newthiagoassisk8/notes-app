import { useLocation } from 'react-router-dom';

export function NoteId() {
    const location = useLocation();

    return (
        <div>
            <div className="w-full h-screen flex items-center justify-center bg-white">
                <p className="overflow-hidden ">{JSON.stringify(location.state)}</p>
            </div>
        </div>
    );
}
