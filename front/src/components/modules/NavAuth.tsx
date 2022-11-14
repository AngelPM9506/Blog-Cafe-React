import React from 'react'
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom'

const NavAuth = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookie, setCookie] = useCookies(['BlogFSIngAP']);
    return (
        <nav>
            {
                cookie.BlogFSIngAP === undefined
                    ? <Link to={'/login'}>LogIn</Link>
                    : <Link to={'logout'}>LogOut</Link>
            }
        </nav>
    )
}

export default NavAuth