import React from 'react'

import PropTypes from 'prop-types'

import HeaderUser from './headeruser'

const Header = ({ setToggled, isToggled, data }) => {
    return (
        <>
            <HeaderUser setToggled={setToggled} isToggled={isToggled} data={data} />
        </>
    )
}

Header.propTypes = {
    setToggled: PropTypes.func,
    isToggled: PropTypes.bool,
    data: PropTypes.any,
}

export default Header
