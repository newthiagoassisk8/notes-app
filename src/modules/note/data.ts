export type DataNote = {
  id: string
  title: string
  isDone: boolean
  content?: string
  createdDate?: string | Date
}

export const dataNotes: DataNote[] = []
