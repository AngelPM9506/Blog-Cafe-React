/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useState, MouseEvent, SyntheticEvent } from 'react'
import { useCookies } from 'react-cookie';
import { AiFillEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { initSesion, selectData, selectErrors, selectToken } from 'src/store/reducer/auth';
import { Errors, LogInInput } from 'src/types/login';
import { expRegEmail } from 'src/utils';

const FormLogIn = () => {
    const initialInput: LogInInput = {
        email: '',
        password: ''
    }
    const initialErrors: Errors = {};
    const [input, setInput] = useState(initialInput);
    const [errors, setErrors] = useState(initialErrors);
    const [seePass, setSeePass] = useState(false);
    const [cookie, setCookie] = useCookies(['BlogFSIngAP']);
    const dispatch = useAppDispatch();
    const { stateToken, stateDate, stateErrors } = {
        stateToken: useAppSelector(selectToken),
        stateDate: useAppSelector(selectData),
        stateErrors: useAppSelector(selectErrors)
    }

    const validate = (input: LogInInput) => {
        const errors: Errors = {};
        if (!input.email || input.email === '' || !expRegEmail.test(input.email)) {
            errors.email = "Solo se admite un correo electronico valido y es obligatorio"
        }
        if (!input.password || input.password === '') {
            errors.password = 'Es obligatorio introducir la contraseña'
        }
        return errors;
    }

    const getValeInput = (event: ChangeEvent<HTMLInputElement> | any) => {
        const { target: { name, value } } = event;
        setInput({ ...input, [name]: value });
        setErrors(validate({ ...input, [name]: value }));
    }

    const watchPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setSeePass(!seePass)
    }

    const startLogIn = async (event: SyntheticEvent) => {
        event.preventDefault();
        if (JSON.stringify(errors) === '{}') {
            await dispatch(initSesion(input)).then(data => {
                const { token: tokenUser, dataUser: userInfo, status } = data.payload;
                const user = { Token: tokenUser, dDta: userInfo };
                if (status === 'success') {
                    setCookie('BlogFSIngAP', user);
                }
            });
        }
    }

    return (
        <form onSubmit={startLogIn}>
            <div className={`alerta ${stateErrors && stateErrors.msg ? 'error' : ''}`}>
                <p>{stateErrors && stateErrors.msg}</p>
            </div>
            <div className="componente">
                <label htmlFor="email">Email:</label>
                <div className="inputContainer">
                    <input type="text" name="email" id="email" onChange={getValeInput} />
                    <div className={`alerta ${errors.email ? 'error' : ''}`}>
                        <p>{errors.email}</p>
                    </div>
                </div>
            </div>
            <div className="componente">
                <label htmlFor="password">Contraseña:</label>
                <div className="inputContainer">
                    <div className="input">
                        <input type={seePass ? 'text' : 'password'} name="password" id="password" onChange={getValeInput} />
                        <button onClick={watchPassword}>
                            {seePass ? <AiFillEye /> : <AiOutlineEyeInvisible />}
                        </button>
                    </div>
                    <div className={`alerta ${errors.password ? 'error' : ''}`}>
                        <p>{errors.password}</p>
                    </div>
                </div>
            </div>
            <div className="botonSubmit">
                <input type="submit" value="Iniciar" onClick={getValeInput} />
                <Link to={'/olvido'}>Olvidaste tu contraseña?</Link>
                <Link to={'/registro'}>Crear cuenta?</Link>
            </div>
        </form >
    )
}

export default FormLogIn