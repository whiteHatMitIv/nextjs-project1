import { Post } from "./promptcardlistType"

export interface ProfileProps {
    name: string
    desc: string
    data: Post[]
    handleEdit?: (post: Post) => void
    handleDelete?: (post: Post) => void
}