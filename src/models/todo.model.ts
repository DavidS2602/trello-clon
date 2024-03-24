export interface ToDo {
    id: number
    title: string
    editing?: boolean
}

export interface Column {
    id: number
    title: string
    todos: ToDo[]
}