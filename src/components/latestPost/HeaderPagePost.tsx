import {useEffect, useState} from "react";
import './HeaderPagePost.css'
import {formatDate} from '../../lib/utils'
import {getLastPost} from "../../api/posts/posts.requests";
interface HeaderPagePost {
    type: string;
    img?: string;
    name?: string;
    date?: string;
    time?: string;
}
//TODO в пропсах передавать какой пост - NEWS ИЛИ TRADE, AI И ТД
export const HeaderPagePost = ( props: HeaderPagePost) => {
    const [img, setImage] = useState<string | undefined>("")
    const [name, setName] = useState<string | undefined>("")
    const [date, setDate] = useState<string | undefined>("")
    const [time, setTime] = useState<string | undefined>("")

    useEffect(() => {
        const fetchData = async () => {
            if (props.type === 'post') {
                setImage(props.img)
                setName(props.name)
                setDate(props.date)
                setTime(props.time)
            } else {
                const response = await getLastPost(props.type)
                setImage(response[0].PreviewImageUrl)
                setName(response[0].Title)
                setDate(formatDate(response[0].CreatedAt))
                setTime('3 min read')
            }
        }

        void fetchData()
    }, [])

    return (
        <div className={"latest-post-container"}>
            <img src={img}  alt={"latest-post-img"}/>
            <div className={"latest-post-name-container"}>{name}</div>
            <div className={"latest-post-date-time-container"}>
                <div>{date}</div>
                <div>{time}</div>
            </div>
        </div>
    )
}