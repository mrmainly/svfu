import React from 'react'
import { Typography } from 'antd'
import PropTypes from 'prop-types'

const { Text, Title } = Typography

const InfoScreen = ({ data }) => {
    const items = [
        {
            label: 'Мои обязанности:',
            value: data?.my_responsibilities,
        },
        {
            label: 'Достижения и поощрения',
            value: data?.rewards,
        },
        {
            label: 'Научные интересы',
            value: data?.scientific_interests,
        },
        {
            label: 'Научные гранты',
            value: data?.scientific_grants,
        },
        {
            label: 'Проведение конференций',
            value: data?.holding_conferences,
        },
        {
            label: 'Участие в конференциях, симпозиумах',
            value: data?.participation_conferences,
        },
        {
            label: 'Почетные звания',
            value: data?.honoured_title,
        },
        {
            label: 'Научно-общественная деятельность',
            value: data?.ssa,
        },
        {
            label: 'Общий стаж работы',
            value: data?.total_experience,
        },
        {
            label: 'Стаж работы по специальности',
            value: data?.specialty_experience,
        },
    ]
    return (
        <div style={{ marginTop: 32 }}>
            {items.map((item, index) => (
                <div key={index} style={{ marginTop: index === 0 ? 0 : 32 }}>
                    <Title italic level={5} style={{ fontWeight: 600 }}>
                        {item.label}
                    </Title>
                    <Text>{item.value === '' || item.value === null ? '-' : item.value}</Text>
                </div>
            ))}
        </div>
    )
}

InfoScreen.propTypes = {
    data: PropTypes.object,
}

export default InfoScreen
