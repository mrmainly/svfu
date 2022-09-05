import React from 'react'
import { useLocation } from 'react-router-dom'
import HeaderLogin from './headerlogin'
import HeaderUser from './headeruser'

import ROUTES from '../../routes'
const Header = ({ setToggled, isToggled, data }) => {
    const params = useLocation()
    return (
        <>
            {params.pathname == ROUTES.LOGIN ||
            params.pathname == ROUTES.REGISTRATION ||
            params.pathname == ROUTES.FORGOT_PASSWORD ? (
                <HeaderLogin />
            ) : (
                <HeaderUser setToggled={setToggled} isToggled={isToggled} data={data} />
            )}
        </>
    )
}

export default Header
