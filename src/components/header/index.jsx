import React from 'react'
import { useLocation } from 'react-router-dom'
import HeaderLogin from './headerlogin'
import HeaderUser from './headeruser'
const Header = ({ setToggled, isToggled }) => {
    const params = useLocation()
    return (
        <>
            {params.pathname == '/' ||
            params.pathname == '/registration' ||
            params.pathname == '/forgot-password' ? (
                <HeaderLogin />
            ) : (
                <HeaderUser setToggled={setToggled} isToggled={isToggled} />
            )}
        </>
    )
}

export default Header
