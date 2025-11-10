export type DataNote = {
  id: number
  title: string
  isDone: boolean
  content?: string
  createdDate?: string | Date
}

export const dataNotes: DataNote[] = [
  {
    id: 1,
    title: 'Month 01: Introduction',
    isDone: true,
    content: 'Frontend HTML & CSS',
    createdDate: new Date(),
  },
  {
    id: 2,
    title: 'Month 02: UI/UX Design',
    isDone: true,
    content: 'Frontend JavaScript',
    createdDate: new Date(),
  },
  {
    id: 3,
    title: 'Month 03: Code Editor',
    isDone: true,
    content: 'Frontend React',
    createdDate: new Date(),
  },
]
