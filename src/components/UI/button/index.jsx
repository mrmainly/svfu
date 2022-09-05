import React from 'react'

import { Button } from 'antd'

import './button.css'

const MyButton = ({ children, ...props }) => (
    <Button type="primary" size="large" {...props} className="btn">
        {children}
    </Button>
)

export default MyButton
