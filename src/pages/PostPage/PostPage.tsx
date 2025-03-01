import Header from "../../components/header/Header";
import {Footer} from "../../components/footer/Footer";
import { useLocation } from 'react-router-dom'
import {useEffect, useState} from "react";
import {HeaderPagePost} from "../../components/latestPost/HeaderPagePost";
import './PostPage.css'
import {PostContent} from "../../components/postContent/PostContent";
import {Spin} from "@gravity-ui/uikit";
import {getPostById} from "../../api/posts/posts.requests";
import {mapPostsOutputToPost} from "../../api/posts/posts.mappers";
import {Post} from "../../api/posts/posts.types";
import {CommentsList} from "../../components/comments/CommentsList";

export const PostPage = () => {
    const location = useLocation()
    const queryParameters = new URLSearchParams(location.search)
    const postId = queryParameters.get('id')
    const [post, setPost] = useState<Post>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            if (postId === null) {
                console.log('Нет id в url')
                return;
            }

            const response = await getPostById(postId)
            const mappedPost: Post = mapPostsOutputToPost(response)
            setPost(mappedPost)
            setIsLoading(false)
        }

        void fetchData()
    }, [postId])

    return (
        <>
            <Header hrefLogout={""}/>
            <div className={'post-container'}>
                {isLoading || post === undefined ? (
                        <Spin size="xl" />
                    ) : (
                        <>
                            <HeaderPagePost type={'post'} name={post?.name} time={post?.time} img={post?.img} date={post?.date}/>
                            <PostContent content={post.content}/>
                            <CommentsList postId={postId!}/>
                        </>
                    )
                }
            </div>
            <Footer />
        </>
    )
}