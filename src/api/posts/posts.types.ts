import {JSONContent} from "@tiptap/react";

export type getPostsInput = {
    limit: number
    offset: number
    topic: string
}

export type CreatePostInput = {
    AuthorEmail: string
    content: string | JSONContent | JSONContent[]
    PreviewImageUrl: string
    Title: string
    Topic: string
}

export type PostOutput = {
    DeletedAt: string
    ID: string
    PreviewImageUrl: string
    Title: string
    AuthorEmail: string
    Content: string
    TokenizedContent: string
    TopicID: string
    Topic: string
    CreatedAt: string
    UpdatedAt: string
}

export type PostsOutput = [PostOutput]

export type Post = {
    img: string;
    name: string;
    date: string;
    time: string;
    type: string;
    id: string;
    content: string;
}