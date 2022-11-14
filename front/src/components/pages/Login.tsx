import React from 'react'
import { useCookies } from 'react-cookie'
import { Navigate } from 'react-router';
import FormLogIn from '../modules/FormLogIn'

const Login = () => {
  const [cookies, setCookies] = useCookies(['BlogFSIngAP']);
  if (cookies.BlogFSIngAP) {
    return <Navigate to={'/'} />
  } else {
    return (
      <main className='logIn'>
        <section className='logInForm'>
          <h3>Inicio de sesión</h3>
          <FormLogIn />
        </section>
      </main>
    )
  }
}

export default Login