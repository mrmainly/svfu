import { Form, Input, Typography } from 'antd'

import React from 'react'

const { Text, Title } = Typography

const SocialForm = () => {
    const data = [
        {
            label: 'VK',
            name: 'vk',
            required: false,
        },
        {
            label: 'Одноклассники',
            name: 'ok',
            required: false,
        },
        {
            label: 'Youtube',
            name: 'youtube',
            required: false,
        },
    ]

    return (
        <div style={{ width: '100%' }}>
            <Title level={4}>Социальные сети</Title>
            {data.map((item, index) => (
                <Form.Item
                    key={index}
                    label={
                        <Text
                            style={{
                                fontWeight: 600,
                                fontSize: 16,
                            }}
                        >
                            {item.label}
                        </Text>
                    }
                    name={item.name}
                    rules={[
                        {
                            required: item.required,
                            message: item.requiredText,
                        },
                    ]}
                    labelCol={{ span: 24 }}
                >
                    <Input
                        placeholder={item.requiredText}
                        size="medium"
                        type={item.type ? item.type : ''}
                        className="input_edit_profile"
                    />
                </Form.Item>
            ))}
        </div>
    )
}

export default SocialForm
