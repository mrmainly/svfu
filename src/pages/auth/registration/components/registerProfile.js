import React from "react";
import { Form, Input, Button, Typography } from "antd";

const { Text } = Typography;

const RegisterProfile = () => {
    const data = [
        {
            name: "",
        },
    ];

    return (
        <Form style={{ width: "100%" }}>
            <Form.Item
                label={
                    <Text style={{ fontWeight: 600, fontSize: 16 }}>Логин</Text>
                }
                name="name"
                labelCol={{ span: 24 }}
            >
                <Input placeholder="Введите логин" size="large" />
            </Form.Item>
            <Form.Item
                label={
                    <Text style={{ fontWeight: 600, fontSize: 16 }}>
                        Фамилия имя отчество
                    </Text>
                }
                name="name"
                labelCol={{ span: 24 }}
            >
                <Input placeholder="Введите ваше ФИО" size="large" />
            </Form.Item>
            <Form.Item
                label={
                    <Text style={{ fontWeight: 600, fontSize: 16 }}>Почта</Text>
                }
                name="name"
                labelCol={{ span: 24 }}
            >
                <Input placeholder="Дата рождения" size="large" />
            </Form.Item>
            <Form.Item
                label={
                    <Text style={{ fontWeight: 600, fontSize: 16 }}>
                        Введите дату рождения дд.мм.гггг
                    </Text>
                }
                name="name"
                labelCol={{ span: 24 }}
            >
                <Input placeholder="Введите вашу почту" size="large" />
            </Form.Item>
            <Form.Item
                label={
                    <Text style={{ fontWeight: 600, fontSize: 16 }}>
                        Пароль
                    </Text>
                }
                name="name"
                labelCol={{ span: 24 }}
            >
                <Input placeholder="Введите пароль" size="large" />
            </Form.Item>
            <Form.Item
                label={
                    <Text style={{ fontWeight: 600, fontSize: 16 }}>
                        Повторить пароль
                    </Text>
                }
                name="name"
                labelCol={{ span: 24 }}
            >
                <Input placeholder="Повторите пароль" size="large" />
            </Form.Item>
            <Button
                style={{
                    background: "#0D6EFD",
                    width: "100%",
                    borderRadius: 4,
                }}
                type="primary"
                htmlType="submit"
                size="large"
            >
                Далее
            </Button>
        </Form>
    );
};

export default RegisterProfile;
