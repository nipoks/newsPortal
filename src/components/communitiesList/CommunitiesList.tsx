import './CommunitiesList.css'
import {Button, Spin, Text} from '@gravity-ui/uikit'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

type Community = {
    img: string;
    name: string;
}

const MOKC = [
    {
        img: '/banners/tradingBanner.svg',
        name: 'TRADING',
    },
    {
        img: '/banners/aiBanner.svg',
        name: 'AI',
    },
    {
        img: '/banners/bitcoinBanner.svg',
        name: 'BITCOIN',
    },
]
export function CommunitiesList() {
    const [arrayCommunities, setArrayCommunities] = useState<Community[]>(MOKC);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [portionCommunities, setPortionCommunities] = useState<number>(3);
    const [offsetCommunities, setOffsetCommunities] = useState<number>(0);
    const [isAllCommunities, setIsAllCommunities] = useState<boolean>(false);
    const navigate = useNavigate()

    useEffect(() => {
        setIsLoading(true)
        getCommunities()
        setIsLoading(false)
    }, []);


    const getCommunities = async () => {
        // try {
        //     //TODO поправить ссылку на получение с бэка комюнити
        //     const response = await fetch(`https://*/posts?limit=${portionCommunities}&offset=${offsetCommunities}`, {
        //         method: "GET",
        //     });
        //
        //     if (!response.ok) throw new Error("Ошибка загрузки данных");
        //     const data = await response.json()
        //     if (data.length < portionCommunities) {
        //         setIsAllCommunities(true)
        //     }
        //     const mappedPosts: Community[] = data.map((post: any) => ({
        //         img: post.PreviewImageUrl,
        //         name: post.Title,
        //     }));
        //
        //     setArrayCommunities(prev => [...(prev ?? []), ...mappedPosts]);
        //     setOffsetCommunities(prev => prev + portionCommunities)
        //
        // } catch (err: any) {
        //     console.error("Ошибка получения постов:", err);
        //
        // }
    }

    const handlerCommunity = (type: string) => {
        console.log(type)
        navigate(`/posts?type=${type}`)
    }

//TODO сейчас прибито, вероятно с бэка будут приходить структуры:  фото, название (для отображения и навигации по нажатию)
    return(
        <>
            {isLoading || arrayCommunities === undefined ? (
                <div className={'communities-list-spin'}>
                    <Spin size="xl" />
                </div>
            ) : (
                <div className={'communities-list-container'}>
                    {arrayCommunities.map((cur) => (
                        <div key={cur.name} className="community-item" onClick={() => handlerCommunity(cur.name)}>
                            <img src={cur.img} alt={cur.name}/>
                            <div className="community-text">{cur.name}</div>
                        </div>
                    ))}
                    {!isAllCommunities
                        ?
                        <Button view={"action"} width={"max"} size={'l'} onClick={getCommunities}>
                            <Text variant={'display-1'}>MORE</Text>
                        </Button>
                        :
                        <></>
                    }
                </div>
            )}
        </>
    )
}