import { Component, ReactNode } from "react";
import { navLink } from "src/types/navLinks/navLinks";
import { navLinks } from "src/utils";
import { ImGithub, ImTwitter } from "react-icons/im";
import { FaLinkedinIn } from "react-icons/fa"
import { SiGmail, SiMicrosoftoutlook, SiDiscord } from "react-icons/si"
import GenarlNav from "../modules/GenarlNav";

class Footer extends Component {
    date: number = new Date().getFullYear();
    nav: navLink[] = navLinks.filter((link: navLink) => (link.name !== 'logIn' && link.name !== 'logOut'));
    text: string[] = [
        ' ∙ Maestro en dirección e ingeniería web',
        ' ∙ Full stack developer',
        ' ∙ Ingeniero en Nanotecnología',
        ' ∙ Técnico en Laboratorista Químico',
    ];
    render(): ReactNode {
        let { nav, text } = this;
        return (
            <footer>
                <section className="footerContainer">
                    <article className="derechos">
                        <p className="copyrigth">Todos los Derechos reservados {`${this.date}`} &copy;</p>
                    </article>
                    <article className="datosContainer">
                        <div className="TitulosBootCamp">
                            <h3>Miguel Angel P.M:</h3>
                            <p>{text.join('')}</p>
                        </div>
                        <div className="redes">
                            <h3>{`Hablame`}</h3>
                            <div className="iconos">
                                <a target={'_blank'} rel="noreferrer" href="https://www.linkedin.com/in/miguel-angel-p-1404a4120/">
                                    <FaLinkedinIn />
                                </a>
                                <a target={'_blank'} rel="noreferrer" href="https://github.com/AngelPM9506">
                                    <ImGithub />
                                </a>
                                <a target={'_blank'} rel="noreferrer" href="https://twitter.com/MiguelAngelPM95">
                                    <ImTwitter />
                                </a>
                                <a target={'_blank'} rel="noreferrer" href="mailto:parramondragon1995@gmail.com">
                                    <SiGmail />
                                </a>
                                <a target={'_blank'} rel="noreferrer" href="mailto:parra_mondragon@live.com">
                                    <SiMicrosoftoutlook />
                                </a>
                                <a target={'_blank'} rel="noreferrer" href="https://discord.gg/bDgXZqD6">
                                    <SiDiscord />
                                </a>
                            </div>
                        </div>
                        <div className="footerNav">
                            <GenarlNav links={nav} />
                        </div>
                    </article>
                </section>
            </footer>
        );
    }
}

export default Footer;