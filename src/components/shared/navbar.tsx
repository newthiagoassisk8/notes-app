import { Link } from 'react-router'
import { Button } from '../ui/button'

export function Navbar() {
  return (
    <div className='top-0 w-full fixed'>
      <nav className=" bg-primary text-primary-foreground mb-8 flex items-center justify-between gap-10 px-8 py-4 shadow-md">
        <Link to="/">
          <h1 className="text-2xl font-bold tracking-tight">Notes App</h1>
        </Link>

        <ul className="flex gap-6">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>


        </ul>

        <div>
          <Button asChild variant="secondary">
            <Link to="/notes/new">New Note</Link>
          </Button>
        </div>
      </nav>
    </div>
  )
}
