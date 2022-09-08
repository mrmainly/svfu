import React from 'react'
import PropTypes from 'prop-types'

import { Button } from 'antd'

import './button.css'

const MyButton = ({ children, ...props }) => (
    <Button type="primary" size="large" {...props} className="btn">
        {children}
    </Button>
)

MyButton.propTypes = {
    children: PropTypes.any,
}

export default MyButton
