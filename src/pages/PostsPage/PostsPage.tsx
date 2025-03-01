import Header from "../../components/header/Header";
import {Footer} from "../../components/footer/Footer";
import {PostsList} from "../../components/postsList/PostsList";
import {HeaderPagePost} from "../../components/latestPost/HeaderPagePost";
import './PostsPage.css'
import {useLocation} from "react-router-dom";

export function PostsPage() {
    const location = useLocation()
    const queryParameters = new URLSearchParams(location.search)
    const type = queryParameters.get('type')

    return(
        <>
            <Header hrefLogout={""}/>
            <div className={'posts-page-container'}>
                <HeaderPagePost type={type!}/>
                <PostsList type={type!}/>
            </div>
            <Footer />
        </>
    )
}