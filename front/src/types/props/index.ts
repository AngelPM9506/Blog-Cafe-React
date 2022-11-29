import { navLink } from "../navLinks/navLinks";

export interface PropsGenNav {
    links: navLink[],
    responsive?: Function
}

export interface SpinIcon {
    element: JSX.Element,
    className: string
}

export interface PropsSpinIcons {
    iconsLenguajes?: SpinIcon[],
    iconsFrameworks?: SpinIcon[],
    iconsDB?: SpinIcon[],
    iconsOtros?: SpinIcon[],
    children?: JSX.Element
}

export interface ListProysProps {
    numberOfProys: number,
    classNames: {
        article: string,
        section: string,
        card: {
            image: string,
            datos: string
        }
    }
}
