import React, { Component, ReactNode } from 'react'
import ScrollToTopOnMount from '../modules/ScrollToTopOnMount';

export class Error404 extends Component {
    render(): ReactNode {
        return (
            <main>
                <ScrollToTopOnMount />
                <h1>Pagina no encontrada: Error 404</h1>
            </main>
        )
    }
}

export default Error404;