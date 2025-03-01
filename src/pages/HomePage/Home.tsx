import { useNavigate } from 'react-router-dom'
import Header from "../../components/header/Header";
import { Footer } from '../../components/footer/Footer'
import './Home.css'
import { useEffect, useState } from 'react';
import { Configuration, FrontendApi } from '@ory/client';

const basePath =
  import.meta.env.VITE_IS_DEV === "true"
    ? "http://localhost:4000"
    : "https://*";

const ory = new FrontendApi(
  new Configuration({
    basePath,
    baseOptions: { withCredentials: true },
  })
);



export const Home = () => {
    const [logoutUrl, setLogoutUrl] = useState("")
    const navigate = useNavigate()
    const handleClickNews = () => navigate(`/posts?type=NEWS`)
    const handleClickCommunity = () => navigate(`/community`)
    const handleClickTalk = () => navigate(`/talk`)


    useEffect(() => {
        const fetchSession = async () => {
          try {
            const { data } = await ory.toSession();
            setLogoutUrl(data?.identity?.traits.logout_url);
          } catch (err: any) {
            console.error("Ошибка получения сессии:", err);
          }
        };
    
        fetchSession();
      }, []);
    
    return (
        <>
            <Header hrefLogout={logoutUrl}/>

            <div className="flex-container">
                <div className="flex-container1">
                    <div className="flex-item" id="block-news" onClick={handleClickNews}>NEWS</div>
                    <div className="flex-item" id="block-crypt"></div>
                </div>
                <div className="flex-container2">
                    <div className="flex-item" id="block-community" onClick={handleClickCommunity}>COMMUNITY</div>
                    <div className="flex-item" id="block-talk" onClick={handleClickTalk}>TALK</div>
                </div>
            </div>

            <Footer />
        </>
    )
}