import React from 'react'
import { Typography } from 'antd'
import PropTypes from 'prop-types'

const { Text, Title } = Typography

const SocialNetworks = ({ data }) => {
    const items = [
        {
            label: 'VK:',
            value: data?.vk,
        },
        {
            label: 'Одноклассники:',
            value: data?.ok,
        },
        {
            label: 'Youtube:',
            value: data?.youtube,
        },
    ]

    return (
        <>
            <Title level={4}>Социальные сети</Title>
            {items.map((item, index) => (
                <div key={index} className="info-field">
                    <div style={{ width: 200 }}>
                        <Text style={{ fontWeight: 600 }}>{item.label}</Text>
                    </div>
                    <Text> {item.value === '' || item.value === null ? '-' : item.value}</Text>
                </div>
            ))}
        </>
    )
}

SocialNetworks.propTypes = {
    data: PropTypes.object,
}

export default SocialNetworks
