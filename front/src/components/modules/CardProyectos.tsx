import React from 'react'
import { Proyect } from 'src/types/store/reducer'

const CardProyectos = ({ Proyecto }: { Proyecto: Proyect }) => {
    const { id, name, image, date } = Proyecto;
    return (
        <div className='cardProyecto'>
            <h3>{name}</h3>
            <p>{image}</p>
            <p><span>{date.toString()}</span></p>
            <p>{id}</p>
        </div>
    )
}

export default CardProyectos