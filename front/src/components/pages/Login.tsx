import React, { Component } from 'react'
import FormLogIn from '../modules/FormLogIn'

export class Login extends Component {
  render() {
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