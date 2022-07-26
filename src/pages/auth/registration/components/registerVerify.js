import React from "react";
import { Form, Input, Button, Typography, Space } from "antd";

const { Text } = Typography;

const RegisterVerify = () => {
    return (
        <Form style={{ width: "100%" }}>
            <Text style={{ fontWeight: 600, fontSize: 16 }}>
                Мы отправили Вам письмо с кодом подтверждения.
            </Text>
            <Form.Item
                style={{ marginBottom: 10, marginTop: 10 }}
                label={
                    <Text style={{ fontWeight: 600, fontSize: 16 }}>
                        Верификационный код
                    </Text>
                }
                name="name"
                labelCol={{ span: 24 }}
            >
                <Input placeholder="Код" size="large" />
            </Form.Item>
            <Text style={{ color: "#0D6EFD", fontSize: 16 }}>
                Отправить код повторно: 59
            </Text>
            <Button
                style={{
                    background: "#0D6EFD",
                    width: "100%",
                    borderRadius: 4,
                    marginTop: 10,
                }}
                type="primary"
                htmlType="submit"
                size="large"
            >
                Далее
            </Button>
            <Space
                style={{
                    marginBottom: "-12px",
                    marginTop: 12,
                }}
                direction="vertical"
            >
                <Text
                    style={{
                        color: "#0D6EFD",
                        cursor: "pointer",
                        fontSize: 16,
                    }}
                >
                    Назад
                </Text>
            </Space>
        </Form>
    );
};

export default RegisterVerify;
