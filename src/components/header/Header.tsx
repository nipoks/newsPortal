import { useNavigate } from 'react-router-dom';
import {DropdownMenu} from '@gravity-ui/uikit';
import './Header.css'
import { Configuration, FrontendApi, Session } from '@ory/client';
import { useEffect, useState } from 'react';

interface HeaderProps {
  hrefLogout?: string;
}

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

export function Header( props: HeaderProps) {
    const navigate = useNavigate();
    const [session, setSession] = useState<Session | null>(null);
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const fetchSession = async () => {
        try {
            const { data } = await ory.toSession()
            setSession(data)
            setIsAuthorized(true)
        } catch (err: any) {
            console.error("Ошибка получения сессии:", err);
            setIsAuthorized(false)
        }
        };
        fetchSession();
    }, []);

    const LoginLogoutHandle = async function () {
        console.log(isAuthorized)
        console.log(session?.identity?.traits.logout_url)

        if (isAuthorized) {
            console.log(session)

            const logoutFlow = await ory.createBrowserLogoutFlow();

            console.log(logoutFlow.data.logout_url)
            window.location.href = logoutFlow.data.logout_url
        } else {
            navigate("/login")
        }
    } 

    return (
    <header className={'header'}>
        <div className={'header-container'}>
            <img alt="logo" src="/icons/Logo1.svg" onClick={() => navigate("/")}
            />
            <div className={"header-right-container"}>
                <img 
                    alt="avater" 
                    src="/icons/AvatarHeader.svg"
                    onClick={() => navigate("/profile")}
                    style={{ cursor: "pointer" }}
                />
                <DropdownMenu
                    size='xl'
                    items={[
                        {
                            action: () => navigate("/"),
                            text: 'Home',
                        },
                        {
                            action: () => navigate("/profile"),
                            text: 'Profile',
                        },
                        {
                            action: LoginLogoutHandle,
                            text:  isAuthorized ? 'Logout' : 'Login',
                        },
                    ]}
                />
                {/* <a href={props.hrefLogout} data-testid="sign-in">
                    <img
                        alt="avater" 
                        style={{ cursor: "pointer" }}
                        src="/assets/icons/Burger.svg"
                    />
                </a> */}
            </div>
        </div>
    </header>
  );
}

export default Header;
