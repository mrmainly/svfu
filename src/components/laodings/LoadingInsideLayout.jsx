import React from 'react'

import { Spin } from 'antd'

const LoadingInsideLayout = () => {
    return (
        <div
            style={{
                display: 'flex',
                height: 500,
                width: '100%',
                justifyContent: 'center',
                paddingTop: 100,
            }}
        >
            <Spin />
        </div>
    )
}

export default LoadingInsideLayout
