import Header from "../../components/header/Header";
import {Footer} from "../../components/footer/Footer";
import './Talk.css'
import {TalksList} from "../../components/talksList/TalksList";
export function Talk() {

    return(
        <>
            <Header hrefLogout={""}/>
            <div className={'talk-container'}>
                <TalksList />
            </div>
            <Footer />
        </>
    )
}