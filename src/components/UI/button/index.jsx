/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

import { ScreenVersionContext } from '../../../context/ScreenVersionContext'
import './button.css'

// const MobileButton = ({ children, ...props }) => (
//     <Button className="btn" type="primary" size="large" {...props}>
//         {children}
//     </Button>
// )

// const DesktopButton = ({ children, ...props }) => (
//     <Button className="btn"  size="large" {...props}>
//         {children}
//     </Button>
// )

const MyButton = ({ children, ...props }) => {
    const { screenVersion } = useContext(ScreenVersionContext)

    if (screenVersion === 'mobile') {
        return (
            <Button className="ant-mobile-btn" {...props} type="primary" size="large">
                {children}
            </Button>
        )
    }
    return (
        <Button className="button-style" {...props} type="primary" size="large">
            {children}
        </Button>
    )
}

MyButton.propTypes = {
    children: PropTypes.any,
}

export default MyButton
