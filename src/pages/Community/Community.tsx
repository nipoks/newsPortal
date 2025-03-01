import Header from "../../components/header/Header";
import {Footer} from "../../components/footer/Footer";
import './Community.css'
import {CommunitiesList} from "../../components/communitiesList/CommunitiesList";
export function Community() {

    return(
        <>
            <Header hrefLogout={""}/>
            <div className={'community-container'}>
                <CommunitiesList />
            </div>
            <Footer />
        </>
    )
}