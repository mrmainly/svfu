import React from 'react'
import { Spin } from 'antd'

const Loading = () => {
    return (
        <div
            style={{
                display: 'flex',
                height: '100vh',
                width: '100%',
                justifyContent: 'center',
                paddingTop: 100,
            }}
        >
            <Spin />
        </div>
    )
}

export default Loading
