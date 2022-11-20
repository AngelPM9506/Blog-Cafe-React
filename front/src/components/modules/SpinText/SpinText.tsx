import React from 'react';
import styles from 'src/scss/modules/SpinText/SpinText.module.scss';

const SpinText = (
    { text, children }
        : {
            text: string,
            children: JSX.Element
        }
) => {
    const length = text.length; // cantidad de letras repartidas
    const deg = 360 / length; // posición de cada letra destribuida en todo el circulo
    const { spiningTextWrapper, spiningText } = styles;
    //console.log(styles);

    return (
        <div className={spiningTextWrapper}>
            <div className={spiningText}>
                <p>{text.split('').map((leter: string, i: number) => {
                    return (
                        <span key={i}
                            style={{ transform: `rotate(${deg * i}deg)` }}>
                            {leter}
                        </span>
                    )
                })}</p>
            </div>
            {children}
        </div>
    )
}

export default SpinText 