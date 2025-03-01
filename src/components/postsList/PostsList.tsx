import {PreviewPost} from "../previewPost/PreviewPost";
import './PostsList.css'
import advertisement from '../../assets/advertisement.jpg'
import {useEffect, useState} from "react";
import {Button, Spin, Text} from '@gravity-ui/uikit';
import {getPosts} from "../../api/posts/posts.requests";
import {Post, PostOutput} from '../../api/posts/posts.types'
import {mapPostsOutputToPost} from "../../api/posts/posts.mappers";

interface PostsListProps {
    type: string;
}

export const PostsList = (props : PostsListProps) => {
    const [arrayPosts, setArrayPosts] = useState<Post[]>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [portionPost, setPortionPost] = useState<number>(10);
    const [offsetPost, setOffsetPost] = useState<number>(0);
    const [isAllPost, setIsAllPost] = useState<boolean>(false);

    useEffect(() => {
        setIsLoading(true)
        loadPosts()
        setIsLoading(false)
    }, []);


    const loadPosts = async () => {
        const response = await getPosts({
            limit: portionPost,
            offset: offsetPost,
            topic: props.type,
        })
        if (response.length < portionPost) {
            setIsAllPost(true)
        }
        const mappedPosts: Post[] = response.map(
            (post: PostOutput) => {
               return  mapPostsOutputToPost(post)
            }
        );

        setArrayPosts(prev => [...(prev ?? []), ...mappedPosts]);
        setOffsetPost(prev => prev + portionPost)
    }

    return (
        <div className="post-list-container">
            {isLoading || arrayPosts === undefined ? (
                <div className={'post-list-spin'}>
                    <Spin size="xl" />
                </div>
            ) : (
                arrayPosts.map((post: Post, index) => (
                    <div key={post.id}>
                        {index % 5 === 0 && index > 0 && (
                            <div className="post-list-advertisement">
                                <img src={advertisement} alt="advertisement" />
                            </div>
                        )}
                        <PreviewPost
                            img={post.img}
                            name={post.name}
                            date={post.date}
                            time={post.time}
                            type={post.type}
                            id={post.id}
                        />
                    </div>
                ))
            )}
            {!isAllPost
                ?
                <Button view={"action"} width={"max"} size={'l'} onClick={loadPosts}>
                    <Text variant={'display-1'}>MORE</Text>
                </Button>
                :
                <></>
            }
        </div>
    )
}