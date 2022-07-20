import React from "react";
import { Typography, Form, Input, Button, Checkbox, Divider } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";

import ROUTES from "../../routes";

const { Title, Text } = Typography;

const Login = () => {
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
                    <img src="/img/image11.png" />
                    <Text
                        style={{
                            fontWeight: 400,
                            fontSize: 18,
                            fontStyle: "normal",
                        }}
                    >
                        АВТОРИЗАЦИЯ
                    </Text>
                    <Form style={{ width: "100%" }}>
                        <Form.Item
                            label={
                                <Text style={{ fontWeight: 600, fontSize: 16 }}>
                                    Логин
                                </Text>
                            }
                            name="name"
                            labelCol={{ span: 24 }}
                        >
                            <Input placeholder="Логин" size="large" />
                        </Form.Item>
                        <Form.Item
                            label={
                                <Text style={{ fontWeight: 600, fontSize: 16 }}>
                                    Пароль
                                </Text>
                            }
                            name="password"
                            labelCol={{ span: 24 }}
                        >
                            <Input.Password placeholder="Пароль" size="large" />
                        </Form.Item>
                        <Form.Item name="checkbox" labelCol={{ span: 24 }}>
                            <Checkbox>
                                <Text style={{ fontWeight: 600, fontSize: 16 }}>
                                    Запомнить логин
                                </Text>
                            </Checkbox>
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
                            Сохранить
                        </Button>
                        <Link
                            to={ROUTES.FORGOT_PASSWORD}
                            style={{
                                marginTop: 12,
                                float: "right",
                                marginBottom: 24,
                            }}
                        >
                            Забыли пароль?
                        </Link>
                        <Divider style={{ marginBottom: 24 }} />
                        <Button
                            style={{
                                background: "#09304A",
                                width: "100%",
                                borderRadius: 4,
                                color: "white",
                            }}
                            htmlType="submit"
                            size="large"
                            onClick={() => navigate(ROUTES.REGISTRATION)}
                        >
                            Зарегистрироваться
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
