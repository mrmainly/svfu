import React from 'react'

import { Form, Typography, Input } from 'antd'

const { Text, Title } = Typography
const { TextArea } = Input

const InfoForm = () => {
    const data = [
        {
            label: 'Моя биография',
            name: 'my_biography',
            required: false,
        },
        {
            label: 'Мои обязанности',
            name: 'my_responsibilities',
            required: false,
        },
        {
            label: 'Достижения и поощрения',
            name: 'scientific_interests',
            required: false,
        },
        {
            label: 'Научные интересы',
            name: 'scientific_interests',
            required: false,
        },
        {
            label: 'Научные гранты',
            name: 'scientific_grants',
            required: false,
        },
        {
            label: 'Проведение конференций',
            name: 'holding_conferences',
            required: false,
        },
        {
            label: 'Участие в конференциях, симпозиумах',
            name: 'participation_conferences',
            required: false,
        },
        {
            label: 'Почетные звания',
            name: 'honoured_title',
            required: false,
        },
        {
            label: 'Научно-общественная деятельность',
            name: 'ssa',
            required: false,
        },
    ]

    return (
        <div>
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
                    <TextArea
                        placeholder="Комментарий к вопросу"
                        rows={4}
                        type={item.type ? item.type : ''}
                    />
                </Form.Item>
            ))}
            <Form.Item
                label={
                    <Text
                        style={{
                            fontWeight: 600,
                            fontSize: 16,
                        }}
                    >
                        Общий стаж работы
                    </Text>
                }
                name={'total_experience'}
                labelCol={{ span: 24 }}
                style={{ width: 350 }}
            >
                <Input placeholder="Общий стаж работы" size="medium" type="number" />
            </Form.Item>
            <Form.Item
                label={
                    <Text
                        style={{
                            fontWeight: 600,
                            fontSize: 16,
                        }}
                    >
                        Стаж работы по специальности
                    </Text>
                }
                name={'specialty_experience'}
                labelCol={{ span: 24 }}
                style={{ width: 350 }}
            >
                <Input placeholder="Стаж работы по специальности" size="medium" type="number" />
            </Form.Item>
        </div>
    )
}

export default InfoForm
