import React from 'react'
import { Typography, Space } from 'antd'

const { Text, Title } = Typography

const InfoScreen = ({ data }) => {
    const items = [
        {
            label: 'Мои обязанности:',
            value: '',
        },
        {
            label: 'Достижения и поощрения',
            value: '',
        },
        {
            label: 'Научные интересы',
            value: '',
        },
        {
            label: 'Научные гранты',
            value: '',
        },
        {
            label: 'Проведение конференций',
            value: '',
        },
        {
            label: 'Участие в конференциях, симпозиумах',
            value: '',
        },
        {
            label: 'Почетные звания',
            value: '',
        },
        {
            label: 'Научно-общественная деятельность',
            value: '',
        },
        {
            label: 'Общий стаж работы',
            value: '',
        },
        {
            label: 'Стаж работы по специальности',
            value: '',
        },
    ]
    return (
        <div style={{ marginTop: 32 }}>
            {items.map((item, index) => (
                <div key={index} style={{ marginTop: index === 0 ? 0 : 32 }}>
                    <Title level={4} style={{ fontWeight: 600 }}>
                        {item.label}
                    </Title>
                    <Text>{item.value === '' || item.value === null ? '-' : item.value}</Text>
                </div>
            ))}
        </div>
    )
}

export default InfoScreen
