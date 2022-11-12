import React, { FC } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Error404 from '../pages/Error404'
import Home from '../pages/Home'
import Login from '../pages/Login'
import { Pruebas } from '../pages/Pruebas'

const Main: FC = (): JSX.Element => {
    const routing = useRoutes([
        { path: '*', element: <Navigate to='/404' /> },
        { path: '/', element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: '404', element: <Error404 /> },
        { path: '95testing', element: <Pruebas /> }
    ]);
    return routing;
}

export default Main