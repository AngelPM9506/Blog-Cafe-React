import { navLink } from "../navLinks/navLinks";

export interface PropsGenNav {
    links: navLink[]
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

