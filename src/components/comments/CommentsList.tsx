import './CommentsList.css'
import {TextArea, Button, useToaster, Text} from '@gravity-ui/uikit';
import {useEffect, useState} from "react";
import {Comment} from './Comment'
import {getComments, postComment} from "../../api/comments/comments.requests";
import {useLocation} from "react-router-dom";
import {CommentOutput} from "../../api/comments/comments.types";
import {formatDate} from "../../lib/utils";
import {Configuration, FrontendApi} from "@ory/client";
import {getAvatar} from "../../api/users/users.requests";

interface CommentsListPost {
    postId: string
}
export const CommentsList = ( props: CommentsListPost ) => {
    const {add} = useToaster();

    const [newCommentText, setNewCommentText] = useState('')
    const location = useLocation()
    const queryParameters = new URLSearchParams(location.search)
    const postId = queryParameters.get('id')

    const [arrComments, setArrComments] = useState<CommentOutput[] | null>([])
    const [isLoading, setIsLoading] = useState(true)
    const [username, setUsername] = useState<string | null>(null);
    const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
    const [isAllComments, setIsAllComments] = useState<boolean>(false);
    const [portionComments, setPortionComments] = useState<number>(10);
    const [offsetComments, setOffsetComments] = useState<number>(0);

    const basePath = import.meta.env.VITE_IS_DEV === "true"
        ? "http://localhost:4000"
        : "https://*";

    const ory = new FrontendApi(
        new Configuration({
            basePath,
            baseOptions: { withCredentials: true },
        })
    );

    const loadComments = async () => {
        if (!postId) return
        const response = await getComments({
            postId: postId,
            limit: portionComments,
            offset: offsetComments
        })
        if (!response) {
            setIsAllComments(true)
            return
        }
        if (response.length < portionComments) {
            setIsAllComments(true)

        }
        setArrComments(prev => [...(prev ?? []), ...response])
        setOffsetComments(prev => prev + portionComments)
    }

    useEffect(() => {
        setIsLoading(true);

        const fetchSession = async () => {
            try {
                const { data } = await ory.toSession();
                setUsername(data.identity?.traits.email); // Устанавливаем имя пользователя
            } catch (err: any) {
                console.error("Ошибка получения сессии:", err);
            }
        };

        loadComments();
        fetchSession();
        setIsLoading(false);
    }, []);

    useEffect(() => {
        if (!username) return

        const fetchAvatar = async () => {
            try {
                const response = await getAvatar(username);
                setProfileImageUrl(response?.Url);
            } catch (error) {
                console.error("Ошибка получения аватара:", error);
            }
        };

        fetchAvatar();
    }, [username]);

    const handlerCreateComment = async () => {
        if (!username || !postId) return
        const response = await postComment({
            author: username,
            parent_id: null,
            post_id: postId,
            text: newCommentText,
        })
        console.log(response)
        add({
            name: "Comment added",
            title: 'Comment successfully added',
            theme: "success",
        });
        setArrComments([...(arrComments || []), response])
        setNewCommentText('')
    }

    const handlerLoginBtn = () => {
        window.location.href = import.meta.env.VITE_IS_DEV === "true"
            ? "http://localhost:4000/ui/login"
            : "https://*/login";
    }

    return (
        isLoading ? null : (
            <div className="comments-container">
                {profileImageUrl ? (
                    <div className="comment-create-container">
                        <img
                            src={profileImageUrl}
                            className="rounded-avatar"
                            alt="Profile"
                        />
                        <div className="comment-create-area-container">
                            <TextArea
                                placeholder="Add a comment"
                                view="clear"
                                value={newCommentText}
                                onChange={val => setNewCommentText(val.target.value)}
                            />
                            <Button view="action" width="max" size="l" onClick={handlerCreateComment}>
                                POST
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className={'comment-message'}>
                        <p>Log in to your account to write comments</p>
                        <Button view="action" width="max" size="l" onClick={handlerLoginBtn}>Login</Button>
                    </div>
                )}



                <div className="comments-list-container">
                    {arrComments !== null && arrComments.length > 0 ? (
                        arrComments.map((comment: CommentOutput) => (
                            <Comment
                                key={comment.id}
                                userName={comment.author}
                                profileImageUrl={comment.author_image_url}
                                date={formatDate(comment.created_at)}
                                content={comment.text}
                            />
                        ))
                    ) : (
                        <div className={'comment-message'}>
                            No comments yet
                        </div>
                    )}

                    <div className="nested-comments-list-container">
                        <div className="comments-list-container">
                            <div className="comment"></div>
                            <div className="comment"></div>
                        </div>
                    </div>
                </div>

                {!isAllComments
                    ?
                    <Button view={"action"} width={"max"} size={'l'} onClick={loadComments}>
                        <Text variant={'display-1'}>See more comments</Text>
                    </Button>
                    :
                    <></>
                }
            </div>
        )
    );
}