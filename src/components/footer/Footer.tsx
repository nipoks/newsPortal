import './Footer.css'
import { MobileFooter} from '@gravity-ui/navigation'

export const Footer = () => {
    return (
        <>
            <MobileFooter
                className="page-footer"
                withDivider={true}
                moreButtonTitle="Show more"
                copyright={``}
            />
            <div className={'social-icons'} >
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    <img src="/icons/YouTube.svg" alt="YouTube" />
                </a>
                <a href="https://t.me" target="_blank" rel="noopener noreferrer">
                    <img src="/icons/Telegram.svg" alt="Telegram" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <img src="/icons/X.svg" alt="X" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <img src="/icons/Linkedin.svg" alt="LinkedIn" />
                </a>
                <a href="https://vk.com" target="_blank" rel="noopener noreferrer">
                    <img src="/icons/VK.svg" alt="VK" />
                </a>
            </div>

            <div className="footer-links">
                <a href="#">Terms Of Use</a>
                <a href="#">Privacy Policy</a>
            </div>

            <div className="footer-text">
                <a>
                     — information resource...
                    We have been working for you since 2025.
                </a>
                <a>
                    All published materials belong .....
                </a>
            </div>

            <div className="footer-last">
                <img src="/icons/LogoFooter.svg" alt="QR Code" className="qr-code" />
                <a>© 2025  </a>
            </div>
        </>
    );
}



