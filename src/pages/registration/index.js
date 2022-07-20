import React from "react";
import { Typography, Form, Input, Button, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./registration.css";

import ROUTES from "../../routes";

const { Text } = Typography;

const Registration = () => {
    const navigate = useNavigate();
    return (
        <div>
            {/* <div
                style={{
                    background: "url(/img/Frame1138.png)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: 40,
                    width: "100%",
                }}
            /> */}
            <div className="background_style">
                <div className="form">
                    <Text
                        style={{
                            fontWeight: 400,
                            fontSize: 18,
                            fontStyle: "normal",
                        }}
                    >
                        РЕГИСТРАЦИЯ
                    </Text>
                    <Form style={{ width: "100%" }}>
                        <Form.Item
                            label={
                                <Text style={{ fontWeight: 600, fontSize: 16 }}>
                                    Почта
                                </Text>
                            }
                            name="name"
                            labelCol={{ span: 24 }}
                        >
                            <Input
                                placeholder="Введите вашу почту"
                                size="large"
                            />
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
                            style={{ marginTop: 12, marginBottom: "-12px" }}
                            direction="vertical"
                        >
                            <Link to={ROUTES.LOGIN}>Есть аккаунт? Войти</Link>
                            <Link to="/">Восстановление пароля</Link>
                        </Space>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Registration;
