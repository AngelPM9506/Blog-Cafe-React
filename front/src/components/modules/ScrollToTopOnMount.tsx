import { Component } from 'react'

export class ScrollToTopOnMount extends Component {
    componentDidMount(): void {
        window.scrollTo(0, 0);
    }
    render(): null {
        return null
    }
}

export default ScrollToTopOnMount