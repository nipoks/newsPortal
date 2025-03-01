import { createRequest } from '../createRequest'
import {CreatePostInput, getPostsInput, PostOutput, PostsOutput} from "./posts.types";

const UrlPrefix = `https://*/api`
export async function getPosts(data: getPostsInput): Promise<PostsOutput> {
    return createRequest<PostsOutput>({
        url: `${UrlPrefix}/posts?limit=${data.limit}&offset=${data.offset}&topic=${data.topic}`,
    })
}
export async function getLastPost(topic: string): Promise<PostsOutput> {
    return createRequest<PostsOutput>({
        url: `${UrlPrefix}/posts?limit=${1}&offset=${0}&topic=${topic}`,
    })
}

export async function getPostById(id: string): Promise<PostOutput> {
    return createRequest<PostOutput>({
        url: `${UrlPrefix}/posts/${id}`,
    })
}

export async function createPost(data: CreatePostInput): Promise<PostOutput> {
    return createRequest<PostOutput>({
        url: `${UrlPrefix}/posts`,
        method: 'POST',
        data: data,
    })
}
