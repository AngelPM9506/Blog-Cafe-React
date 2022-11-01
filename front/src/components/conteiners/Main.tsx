import React, { FC } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'
import Error404 from '../pages/Error404'
import Home from '../pages/Home'
import Login from '../pages/Login'

const Main: FC = (): JSX.Element => {
    const routing = useRoutes([
        { path: '*', element: <Navigate to='/404' /> },
        { path: '/', element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: '404', element: <Error404 /> }
    ]);
    return routing;
}

export default Main