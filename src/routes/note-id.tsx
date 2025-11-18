import { useLocation } from 'react-router-dom'

export function NoteId() {
  const location = useLocation()

  return (
    <div>
      <div className="flex h-screen w-full items-center justify-center bg-white">
        <p className="overflow-hidden">{JSON.stringify(location.state)}</p>
      </div>
    </div>
  )
}
