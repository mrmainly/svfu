import React, { useState } from 'react'

import { Form, Typography, Input, Upload, message } from 'antd'

const { Text } = Typography

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload = () => resolve(reader.result)

        reader.onerror = (error) => reject(error)
    })

const ProfileForm = () => {
    const [fileList, setFileList] = useState([])

    const inputs = [
        {
            label: 'Фамилия',
            name: 'last_name',
            required: true,
            requiredText: 'Введите фамилию',
        },
        {
            label: 'Имя',
            name: 'first_name',
            required: true,
            requiredText: 'Введите имя',
        },
        {
            label: 'Отчество',
            name: 'patronymic',
            required: true,
            requiredText: 'Введите отчество',
        },
        {
            label: 'Дата рождения',
            name: 'birth_date',
            required: false,
            type: 'date',
        },
        {
            label: 'Телефон',
            name: 'phone',
            required: true,
            requiredText: 'Введите ваш телефон',
        },
        {
            label: 'ИНН',
            name: 'inn',
            required: false,
            requiredText: 'Введите ваш ИНН',
            pattern:
                /^(([0-9]{10}([0-9]{2})?)|([0-9]{4}\-[0-9]{5}\-[0-9]{1})|([0-9]{4}\-[0-9]{6}\-[0-9]{2}))$/,
            pattern_message: 'Проверьте правильность ИНН',
        },
        {
            label: 'СНИЛС',
            name: 'snils',
            required: false,
            requiredText: 'Введите ваш СНИЛС',
            pattern: /^(([0-9]{3}\-[0-9]{3}\-[0-9]{3}\-[0-9]{2})|([0-9]{11}))$/,
            pattern_message: 'Проверьте правильность СНИЛСа',
        },
    ]

    return (
        <div style={{ width: 350 }}>
            {inputs.map((item, index) => (
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
                        {
                            pattern: item.pattern ? item.pattern : '',
                            message: item.pattern_message ? item.pattern_message : '',
                        },
                        {
                            min: item.len ? item.len : '',
                            message: item.len_message ? item.len_message : '',
                        },
                    ]}
                    labelCol={{ span: 24 }}
                >
                    <Input
                        placeholder={item.requiredText}
                        size="medium"
                        type={item.type ? item.type : ''}
                    />
                </Form.Item>
            ))}
        </div>
    )
}

export default ProfileForm
