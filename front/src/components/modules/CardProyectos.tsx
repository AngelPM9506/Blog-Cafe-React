import React from 'react'
import { Link } from 'react-router-dom';
import { Proyect } from 'src/types/store/reducer'

const CardProyectos = ({ Proyecto }: { Proyecto: Proyect }) => {
    const { id, name, image, date } = Proyecto;
    const fecha = date.toString().split('T').shift().split('-').join('/');
    return (
        <div className='cardProyecto'>
            <Link className="info" to={`/projects/${id}`}>
                <div className="imagen">
                    <picture>
                        <img src={image} alt="" />
                    </picture>
                </div>
                <div className="datos">
                    <h3>{name}</h3>
                    <p><span>{fecha}</span></p>
                </div>
            </Link>
        </div>
    )
}

export default CardProyectos