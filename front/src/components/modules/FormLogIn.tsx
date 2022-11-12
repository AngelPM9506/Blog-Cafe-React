import React, { ChangeEvent, useState, MouseEvent, SyntheticEvent } from 'react'
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { initSesion, selectData, selectErrors, selectToken } from 'src/store/reducer/auth';
import { Errors, LogInInput } from 'src/types/login';

const FormLogIn = () => {
    const initialInput: LogInInput = {
        email: '',
        password: ''
    }
    const initialErrors: Errors = {};
    const [input, setInput] = useState(initialInput);
    const [errors, setErrors] = useState(initialErrors);
    const [seePass, setSeePass] = useState(false);
    const dispatch = useAppDispatch();
    const { stateToken, stateDate, stateErrors } = {
        stateToken: useAppSelector(selectToken),
        stateDate: useAppSelector(selectData),
        stateErrors: useAppSelector(selectErrors)
    }
    const validate = () => { }

    const getValeInput = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setInput({ ...input, [name]: value });
    }

    const watchPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setSeePass(!seePass)
    }

    const startLogIn = async (event: SyntheticEvent) => {
        event.preventDefault();
        dispatch(initSesion(input))

    }

    return (
        <form onSubmit={startLogIn}>
            <div className="error">
                <p>{stateErrors && stateErrors.msg}</p>
            </div>
            <div className="componente">
                <label htmlFor="email">Email:</label>
                <input type="text" name="email" id="email" onChange={getValeInput} />
                <p className="error">{ }</p>
            </div>
            <div className="componente">
                <label htmlFor="password">Contraseña:</label>
                <div className="input">
                    <input type={seePass ? 'text' : 'password'} name="password" id="password" onChange={getValeInput} />
                    <button onClick={watchPassword}>
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
    )
}

export default FormLogIn