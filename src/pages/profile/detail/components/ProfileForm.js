import React from "react";

import { Form, Typography, Input } from "antd";

const { Text } = Typography;

const ProfileForm = () => {
    const data = [
        {
            label: "Логин",
            name: "login",
            required: true,
            requiredText: "Введите логин",
        },
        {
            label: "Фамилия",
            name: "last_name",
            required: true,
            requiredText: "Введите фамилию",
        },
        {
            label: "Имя",
            name: "first_name",
            required: true,
            requiredText: "Введите имя",
        },
        {
            label: "Отчество",
            name: "patronymic",
            required: true,
            requiredText: "Введите отчество",
        },
        {
            label: "Дата рождения",
            name: "birth_date",
            required: false,
            type: "date",
        },
        {
            label: "Почта",
            name: "email",
            required: true,
            requiredText: "Введите вашу почту",
        },
        {
            label: "Телефон",
            name: "phone",
            required: true,
            requiredText: "Введите ваш телефон",
        },
        {
            label: "ИНН",
            name: "inn",
            required: false,
            requiredText: "Введите ваш ИНН",
        },
        {
            label: "СНИЛС",
            name: "snils",
            required: false,
            requiredText: "Введите ваш СНИЛС",
        },
    ];

    return (
        <div style={{ width: 350 }}>
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
                        type={item.type ? item.type : ""}
                    />
                </Form.Item>
            ))}
        </div>
    );
};

export default ProfileForm;
