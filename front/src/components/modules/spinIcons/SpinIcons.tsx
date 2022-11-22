import React from 'react'
import styles from 'src/scss/modules/SpinIcons/SpinIcons.module.scss';
import { PropsSpinIcons, SpinIcon } from 'src/types/props';
const SpinIcons = ({
    iconsLenguajes,
    iconsFrameworks,
    iconsDB,
    iconsOtros,
    children
}: PropsSpinIcons) => {
    const calcRotation = (nIcons: number) => {
        return 360 / nIcons
    }
    const { spiningIconsWrapper, spiningIconsPrim, spiningIconsSecu, children: child, anilloExt, anilloInt, anilloCentral } = styles;

    return (
        <div className={spiningIconsWrapper}>
            <div className={spiningIconsPrim}>
                <p>{iconsLenguajes.map((icon: SpinIcon, i: number) => {
                    const { element, className } = icon;
                    return (
                        <span key={i}
                            style={{ transform: `rotate(${calcRotation(iconsLenguajes.length) * i}deg)` }}
                            className={styles[className]}
                        >
                            {element}
                        </span>
                    );
                })}</p>
            </div>
            <div className={spiningIconsSecu}>
                <p>{iconsFrameworks.map((icon: SpinIcon, i: number) => {
                    const { element, className } = icon;
                    return (
                        <span key={i}
                            style={{ transform: `rotate(${calcRotation(iconsFrameworks.length) * i}deg)` }}
                            className={styles[className]}
                        >
                            {element}
                        </span>
                    );
                })}</p>
            </div>
            <div className={anilloExt}></div>
            <div className={anilloInt}></div>
            <div className={anilloCentral}></div>
            <div className={child}>
                {children ? children : null}
            </div>
        </div >
    )
}

export default SpinIcons