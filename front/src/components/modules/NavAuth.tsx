import React from 'react'
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom'

const NavAuth = (props: { responsive?: Function }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookie, setCookie, removeCookie] = useCookies(['BlogFSIngAP']);
    const { responsive } = props;
    const changeStateResp = () => responsive();
    const logOut = () => {
        removeCookie('BlogFSIngAP');
        props.responsive();
    }
    return (
        <nav>
            {
                cookie.BlogFSIngAP === undefined
                    ? <Link to={'/login'} onClick={changeStateResp}>LogIn</Link>
                    : <Link to={'/contacto'} onClick={logOut}>LogOut</Link>
            }
        </nav>
    )
}

export default NavAuth