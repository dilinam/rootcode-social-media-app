export type Post = {
    id: number;
    title: string;
    description: string;
    comments: Comment[]
}

export type Comment = {
    id: number;
    commentText: string
}