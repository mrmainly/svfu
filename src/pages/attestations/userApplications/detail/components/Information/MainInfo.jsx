import React from 'react'

import { Space, Typography } from 'antd'

const { Text } = Typography

const MainInfo = ({ data }) => {
    const items = [
        {
            label: 'ID:',
            value: data.id,
        },
        {
            label: 'Фамилия:',
            value: data.last_name,
        },
        {
            label: 'Имя:',
            value: data.first_name,
        },
        {
            label: 'Отчество:',
            value: data.patronymic,
        },
        {
            label: 'Электронная почта:',
            value: data.email,
        },
        {
            label: 'Телефон:',
            value: data.phone,
        },
        {
            label: 'Инн:',
            value: data.inn,
        },
        {
            label: 'СНИЛС:',
            value: data.snils,
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
