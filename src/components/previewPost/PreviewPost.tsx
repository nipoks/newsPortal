import './PreviewPost.css'
import {useNavigate} from "react-router-dom";

interface PreviewPostProps {
    img: string;
    name: string;
    date: string;
    time: string;
    type: string;
    id: string;
}
export const PreviewPost = ( props: PreviewPostProps) => {
    const navigate = useNavigate()

    const handlerClick = () => navigate(`/post?id=${props.id}`)

    return (
        <div className={"preview-post-container"} onClick={handlerClick}>
            <img className={"preview-post-img-container"} src={props.img} alt={''} />
            <div className={"preview-post-text-container"}>
                <div className={"preview-post-type-container"}>{props.type}</div>
                <div className="preview-post-name-container">
                    <div className={"preview-post-name-content"}>{props.name}</div>
                </div>
                <div className={"preview-post-date-time-container"}>
                    <div>{props.date}</div>
                    <div>{props.time}</div>
                </div>
            </div>
        </div>
    )
}