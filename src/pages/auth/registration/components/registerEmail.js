import React from "react";
import { Form, Input, Button, Typography, Space } from "antd";
import { Link } from "react-router-dom";

import ROUTES from "../../../../routes";

const { Text } = Typography;

const RegisterEmail = () => {
    return (
        <Form style={{ width: "100%" }}>
            <Form.Item
                label={
                    <Text style={{ fontWeight: 600, fontSize: 16 }}>Почта</Text>
                }
                name="name"
                labelCol={{ span: 24 }}
            >
                <Input placeholder="Введите вашу почту" size="large" />
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
            <Space
                style={{
                    marginBottom: "-12px",
                    marginTop: 12,
                }}
                direction="vertical"
            >
                <Link to={ROUTES.LOGIN}>Есть аккаунт? Войти</Link>
                <Link to="/">Восстановление пароля</Link>
            </Space>
        </Form>
    );
};

export default RegisterEmail;
