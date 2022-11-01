import { Component, ReactNode } from "react";

class Footer extends Component {
    render(): ReactNode {
        return (
            <footer>
                <section>
                    <h3>Datos</h3>
                    <article>
                        <p>Miguel Angel Parra Mondragon</p>
                        <p>Maestro en Direccion e ingeneria web</p>
                        <p>Ingeniero en Nanotecnología</p>
                        <p>Tecnico Laboratorista químico</p>
                    </article>
                </section>
                <section>
                    <h3>Redes Sociales</h3>
                </section>
                <section>
                    <h3>Nav</h3>
                </section>
            </footer>
        );
    }
}

export default Footer;