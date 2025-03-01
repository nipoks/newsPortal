export type CommentOutput = {
    author: string
    author_image_url: string
    created_at: string
    id: string
    parent_id: string
    post_id: string
    text: string
}

export type CommentsOutput = [CommentOutput]

export type CommentsInput = {
    postId: string
    limit: number
    offset: number
}

export type CommentInput = {
    author: string
    parent_id: string | null
    post_id: string
    text: string
}