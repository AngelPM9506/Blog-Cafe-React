import React, { FC } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Error404 from '../pages/Error404'
import Home from '../pages/Home'
import Login from '../pages/Login'
import CrearMod from '../pages/proyectos/CrearMod'
import Proyecto from '../pages/proyectos/Proyecto'
import Proyectos from '../pages/proyectos/Proyectos'
import { Pruebas } from '../pages/Pruebas'

const Main: FC = (): JSX.Element => {
    const routing = useRoutes([
        { path: '*', element: <Navigate to='/404' /> },
        { path: '/', element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: '404', element: <Error404 /> },
        { path: '95testing', element: <Pruebas /> },
        { path: 'proyectos', element: <Proyectos /> },
        { path: 'proyectos/crear', element: <CrearMod /> },
        { path: 'proyectos/editar/:id', element: <CrearMod /> },
        { path: 'proyectos/:id', element: <Proyecto /> },
    ]);
    return routing;
}

export default Main