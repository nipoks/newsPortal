import './TalksList.css'
import {useState} from "react";
import {useNavigate} from "react-router-dom";

type Talk = {
    img: string;
    label: string;
    description: string;
}

const MOK = [
    {
        img: '/banners/freshBanner.svg',
        label: 'FRESH',
        description: 'Еhe latest industry news',
    },
    {
        img: '/banners/hotBanner.svg',
        label: 'HOT',
        description: 'The most discussed news in the world of cryptocurrencies and new technologies',
    },
    {
        img: '/banners/cleanBanner.svg',
        label: 'CLEAN',
        description: 'Be the first to see this news',
    },
]
export function TalksList() {
    const [arrayTalks, setArrayTalks] = useState<Talk[]>(MOK);
    const navigate = useNavigate()

    const handlerTalk = (type: string) => {
        console.log(type)
        navigate(`/posts?type=${type}`)
    }

    return(
        <div className={'talks-list-container'}>
            {arrayTalks.map((cur) => (
                <div key={cur.label} className="talk-item" onClick={() => handlerTalk(cur.label)}>
                    <div>
                        <img src={cur.img} alt={cur.label}/>
                        <div className="talk-content">
                            <div className="talk-label">{cur.label}</div>
                            <div className="talk-description">{cur.description}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>

    )
}