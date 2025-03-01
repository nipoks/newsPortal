import {Text} from "@gravity-ui/uikit";
import './Comment.css'

interface CommentProps {
    profileImageUrl: string;
    userName: string;
    date: string;
    content: string;
    reactions?: {
        like: number;
        comments: number;
    };
}
export const Comment = (props : CommentProps) => {

    const handlerClickLike = () => {

    }

    const handlerClickComment = () => {

    }

    return (
        <div className={'comment-container'}>
            <img
                src={props.profileImageUrl}
                className="rounded-avatar-comment"
                alt="Profile"
            />

            <div className={'comment-area-container'}>
                <div className={'comment-header'}>
                    <div className={'comment-header-username'}>{props.userName}</div>
                    <div className={'comment-header-date'}>{props.date}</div>
                </div>
                <div className={'comment-content'}>
                    <Text>{props.content}</Text>
                </div>
                <div className={'comment-footer'}>
                    <div className={'comment-footer-item'}  onClick={handlerClickLike}>
                        <img src="/icons/like.svg" alt="like" className="comment-footer-icon" />
                        {/*<div>2</div> TODO получать из объекта цифру*/}
                    </div>
                    <div className={'comment-footer-item'} onClick={handlerClickComment}>
                        <img src="/icons/comment.svg" alt="comment" className="comment-footer-icon" />
                        {/*<div>2</div> TODO получать из объекта цифру*/}
                    </div>
                </div>
            </div>

        </div>
    )
}