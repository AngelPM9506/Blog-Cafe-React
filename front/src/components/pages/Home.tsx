import { Component, ReactNode } from 'react'
import SpinIcons from '../modules/spinIcons/SpinIcons'
import {
    SiTypescript,
    SiJavascript,
    SiPhp,
    SiNano,
    SiReact,
    SiNextdotjs,
    SiNodedotjs,
    SiHtml5,
    SiSass,
    SiCss3,
    SiArduino,
    SiLaravel,
    SiRedux,
    SiExpress,
    SiAngularjs,
    SiWindows,
    SiLinux,
    SiMongodb,
    SiPostgresql,
    SiPrisma,
    SiSequelize,
    SiVisualstudiocode,
    SiAtom
} from 'react-icons/si';
import { SlChemistry } from 'react-icons/sl';
import { SpinIcon } from 'src/types/props';
import { GiTechnoHeart, GiMaterialsScience } from 'react-icons/gi';
import { FcBiotech } from 'react-icons/fc';
import { GrMysql } from 'react-icons/gr'
import ListProyects from '../modules/ListProyects';
import ScrollToTopOnMount from '../modules/ScrollToTopOnMount';

export class Home extends Component {
    iconsLenguajes: SpinIcon[] = [
        { element: <SiJavascript />, className: 'JS' },
        { element: <SiNano />, className: 'NANO' },
        { element: <SiPhp />, className: 'PHP' },
        { element: <SiTypescript />, className: 'TS' },
        { element: <GiMaterialsScience />, className: 'CFM' },
        { element: <SiHtml5 />, className: 'HTML' },
        { element: <SlChemistry />, className: 'CHEM' },
        { element: <SiCss3 />, className: 'CSS' },
        { element: <FcBiotech />, className: 'BIO' },
    ]
    iconsFrameworks: SpinIcon[] = [
        { element: <SiNodedotjs />, className: 'NOD' },
        { element: <SiReact />, className: 'REA' },
        { element: <SiNextdotjs />, className: 'NEX' },
        { element: <SiArduino />, className: 'ARD' },
        { element: <SiSass />, className: 'SAS' },
        { element: <SiLaravel />, className: 'LAR' },
        { element: <SiRedux />, className: 'RED' },
        { element: <SiExpress />, className: 'EXP' },
        { element: <SiAngularjs />, className: 'ANG' },
        { element: <SiWindows />, className: 'WIN' },
        { element: <SiLinux />, className: 'LIN' },
        { element: <SiMongodb />, className: 'MON' },
        { element: <SiPostgresql />, className: 'POS' },
        { element: <GrMysql />, className: 'MYS' },
        { element: <SiPrisma />, className: 'PRIS' },
        { element: <SiSequelize />, className: 'SEQ' },
        { element: <SiVisualstudiocode />, className: 'VSC' },
        { element: <SiAtom />, className: 'ATM' },
    ]
    render(): ReactNode {
        return (
            <main className='home'>
                <ScrollToTopOnMount />
                <section className='resumen'>
                    <article>
                        <div className="text">
                            <h3>Hola, que tal?</h3>
                            <h2>Soy Miguel Angel Parra Mondragon</h2>
                            <h3>Este es mi blog y portafolio</h3>
                        </div>
                        <div className='pictures'>
                            <div className='spinIcons'>
                                <SpinIcons
                                    iconsLenguajes={this.iconsLenguajes}
                                    iconsFrameworks={this.iconsFrameworks}>
                                    <p><GiTechnoHeart /></p>
                                </SpinIcons >
                            </div>
                            <div className="foto"></div>
                        </div>
                        <div className="text">
                            <p>Soy Técnico laboratorista químico, Ingeniero en nanotecnología, desarrollador full-Stack y Maestro en dirección e ingeniería web, me apasiona la ciencia y la tecnología.</p>
                        </div>
                    </article>
                </section>
                <section>
                    <ListProyects />
                </section>
                <section>
                    <h2>ultimos posts</h2>
                </section>
                <section>
                    <h2>resumen de aboutme</h2>
                </section>
                <section>
                    <h2>tecnologias</h2>
                </section>
            </main>
        )
    }
}

export default Home