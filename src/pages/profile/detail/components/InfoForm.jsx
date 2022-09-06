import { Form, Input, Typography } from 'antd'

import React from 'react'

const { Text, Title } = Typography
const { TextArea } = Input

const InfoForm = () => {
    const data = [
        {
            label: 'Моя биография',
            name: 'my_biography',
            placeholder: 'Напишите биографию',
            required: false,
        },
        {
            label: 'Мои обязанности',
            name: 'my_responsibilities',
            placeholder: 'Напишите о своих обязанностях',
            required: false,
        },
        {
            label: 'Достижения и поощрения',
            name: 'rewards',
            placeholder: 'Напишите о своих достижениях и поощрениях',
            required: false,
        },
        {
            label: 'Научные интересы',
            name: 'scientific_interests',
            placeholder: 'Напишите о научных интересах',
            required: false,
        },
        {
            label: 'Научные гранты',
            name: 'scientific_grants',
            placeholder: 'Напишите о научных грантах',
            required: false,
        },
        {
            label: 'Проведение конференций',
            name: 'holding_conferences',
            placeholder: 'Напишите о проведении конференций',
            required: false,
        },
        {
            label: 'Участие в конференциях, симпозиумах',
            name: 'participation_conferences',
            placeholder: 'Напишите о своих участиях в конференциях, симпозиумах',
            required: false,
        },
        {
            label: 'Почетные звания',
            name: 'honoured_title',
            placeholder: 'Напишите о своих почетных званиях',
            required: false,
        },
        {
            label: 'Научно-общественная деятельность',
            name: 'ssa',
            placeholder: 'Напишите о научно-общественной деятельности',
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
                        placeholder={item.placeholder}
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
                style={{ width: "100%" }}
            >
                <Input min={0} placeholder="Общий стаж работы" size="medium" type="number" />
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
                style={{ width: "100%" }}
            >
                <Input
                    min={0}
                    placeholder="Стаж работы по специальности"
                    size="medium"
                    type="number"
                />
            </Form.Item>
        </div>
    )
}

export default InfoForm
