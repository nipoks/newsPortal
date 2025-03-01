import { createRequest } from '../createRequest'
import {CommentInput, CommentOutput, CommentsInput, CommentsOutput} from "./comments.types"

const UrlPrefix = `https://*/api`
export async function getComments(data: CommentsInput): Promise<CommentsOutput> {
    return createRequest<CommentsOutput>({
        url: `${UrlPrefix}/comments?post_id=${data.postId}&limit=${data.limit}&offset=${data.offset}`,
    })
}

export async function postComment(data: CommentInput): Promise<CommentOutput> {
    return createRequest<CommentOutput>({
        url: `${UrlPrefix}/comments`,
        method: 'POST',
        data: data,
    })
}
