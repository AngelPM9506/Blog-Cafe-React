/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Navigate } from 'react-router';
import FormLogIn from '../modules/FormLogIn'
import ScrollToTopOnMount from '../modules/ScrollToTopOnMount';

const Login = () => {
  const [cookies, setCookies] = useCookies(['BlogFSIngAP']);
  useEffect(() => { window.scrollTo(0, 0) }, []);
  if (cookies.BlogFSIngAP) {
    return <Navigate to={'/'} />
  } else {
    return (
      <main className='logIn'>
        <ScrollToTopOnMount />
        <section className='logInForm'>
          <h3>Inicio de sesión</h3>
          <FormLogIn />
        </section>
      </main>
    )
  }
}

export default Login