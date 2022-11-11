import React, { ChangeEvent, Component, MouseEvent } from 'react'
import { StateLogIn } from 'src/types/login';
import { AiOutlineEyeInvisible, AiFillEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

export class Login extends Component {
  state: StateLogIn = {
    input: {
      email: '',
      password: ''
    },
    errors: {},
    typeInput: {
      seePass: false
    }
  }
  getValeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState({ input: { ...this.state.input, [name]: value } })
  }
  watchPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.setState({ typeInput: { ...this.state.typeInput, seePass: this.state.typeInput.seePass ? false : true } });
  }
  render() {
    const { seePass } = this.state.typeInput;
    return (
      <main className='logIn'>
        <section className='logInForm'>
          <h3>Inicio de sesión</h3>
          <form>
            <div className="componente">
              <label htmlFor="email">Email:</label>
              <input type="text" name="email" id="email" onChange={this.getValeInput} />
              <p className="error">{ }</p>
            </div>
            <div className="componente">
              <label htmlFor="password">Contraseña:</label>
              <div className="input">
                <input type={seePass ? 'text' : 'password'} name="password" id="password" onChange={this.getValeInput} />
                <button onClick={this.watchPassword}>
                  {seePass ? <AiFillEye /> : <AiOutlineEyeInvisible />}
                </button>
              </div>
              <p className="error">{ }</p>
            </div>
            <div className="botonSubmit">
              <input type="submit" value="Iniciar" />
              <Link to={'/olvido'}>Olvidaste tu contraseña?</Link>
              <Link to={'/registro'}>Crear cuenta?</Link>
            </div>
          </form>
        </section>
      </main>
    )
  }
}

export default Login