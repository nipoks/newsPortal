import React from 'react'
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import Login from "../pages/Login";
import {Home} from "../pages/HomePage/Home";
import {PostPage} from "../pages/PostPage/PostPage";
import {Community} from "../pages/Community/Community";
import {Talk} from "../pages/Talk/Talk";
import {PostsPage} from "../pages/PostsPage/PostsPage";

interface RouteProps {
    page:  React.ComponentType
    path: string
}

export function getRoutes(): RouteProps[] {
    return [
        {
            page: ProfilePage,
            path: '/profile',
        },
        {
            page: Home,
            path: '/',
        },
        {
            page: PostPage,
            path: '/post',
        },
        {
            page: PostsPage,
            path: '/posts',
        },
        {
            page: Community,
            path: '/community',
        },
        {
            page: Talk,
            path: '/talk',
        },
        {
            page: Login,
            path: '/login'
        }
    ]
}