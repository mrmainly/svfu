import React from 'react'

import { Space, Typography } from 'antd'

const { Text } = Typography

const MainInfo = () => {
    const items = [
        {
            label: 'ID:',
            value: '',
        },
        {
            label: 'Фамилия:',
            value: '',
        },
        {
            label: 'Имя:',
            value: '',
        },
        {
            label: 'Отчество:',
            value: '',
        },
        {
            label: 'Электронная почта:',
            value: '',
        },
        {
            label: 'Телефон:',
            value: '',
        },
        {
            label: 'Инн:',
            value: '',
        },
        {
            label: 'КПП:',
            value: '',
        },
    ]

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {items.map((item, index) => (
                <Space key={index} size="middle" style={{ marginTop: 12 }}>
                    <div style={{ width: 200 }}>
                        <Text style={{ fontWeight: 600 }}>{item.label}</Text>
                    </div>
                    <Text>{item.value === '' || item.value === null ? '-' : item.value}</Text>
                </Space>
            ))}
        </div>
    )
}

export default MainInfo
