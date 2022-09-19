import React from 'react'
import { Typography, Space } from 'antd'
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
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Title level={5} italic>
                Социальные сети
            </Title>
            {items.map((item, index) => (
                <Space key={index} size="middle" style={{ marginTop: index === 0 ? 0 : 12 }}>
                    <div style={{ width: 200 }}>
                        <Text style={{ fontWeight: 600 }}>{item.label}</Text>
                    </div>
                    <Text> {item.value === '' || item.value === null ? '-' : item.value}</Text>
                </Space>
            ))}
        </div>
    )
}

SocialNetworks.propTypes = {
    data: PropTypes.object,
}

export default SocialNetworks
