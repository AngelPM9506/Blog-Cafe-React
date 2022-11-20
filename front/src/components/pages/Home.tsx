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
    SiLaravel
} from 'react-icons/si';
import { SlChemistry } from 'react-icons/sl';
import { SpinIcon } from 'src/types/props';
import { GiTechnoHeart } from 'react-icons/gi'

export class Home extends Component {
    iconsLenguajes: SpinIcon[] = [
        { element: <SiJavascript />, className: 'JS' },
        { element: <SiPhp />, className: 'PHP' },
        { element: <SiTypescript />, className: 'TS' },
        { element: <SiHtml5 />, className: 'HTML' },
        { element: <SiCss3 />, className: 'CSS' },
    ]
    iconsFrameworks: SpinIcon[] = [
        { element: <SiNano />, className: 'NANO' },
        { element: <SiNodedotjs />, className: 'NOD' },
        { element: <SiReact />, className: 'REA' },
        { element: <SiNextdotjs />, className: 'NEX' },
        { element: <SlChemistry />, className: 'CHEM' },
        { element: <SiArduino />, className: 'ARD' },
        { element: <SiSass />, className: 'SAS' },
        { element: <SiLaravel />, className: 'LAR' },
    ]
    render(): ReactNode {
        return (
            <main className='home'>
                <section className='resumen'>
                    <article>
                        <h4>Hola, que tal?</h4>
                        <h2>Soy Miguel Angel P.M.</h2>
                        <h3>y este es mi blog y portafolio</h3>
                        <h5>Un poco sobremi:</h5>
                        <p>Soy Tecnico laboratorista químico, Ingeniero en nanotecnología, desarollador full-Stack y Maestro en direccion e ingenieria web</p>
                    </article>
                    <SpinIcons
                        iconsLenguajes={this.iconsLenguajes}
                        iconsFrameworks={this.iconsFrameworks}>
                        <p><GiTechnoHeart /></p>
                    </SpinIcons >
                </section>
                <section>
                    <h2>proyectos</h2>
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