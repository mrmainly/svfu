import React from "react";
import { Typography, Form, Input, Button, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./forgot_password.css";

import ROUTES from "../../routes";

const { Text } = Typography;

const ForgotPassword = () => {
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
                        ВОССТАНОВЛЕНИЕ ПАРОЛЯ
                    </Text>
                    <Text
                        style={{
                            fontWeight: 400,
                            fontSize: 16,
                            fontStyle: "normal",
                        }}
                    >
                        Введите вашу почту, которую вы ввели при регистрации.
                        Если вы забыли адрес электронной почты, проверьте
                        данные.
                    </Text>
                    <Form style={{ width: "100%" }}>
                        <Form.Item
                            label={
                                <Text style={{ fontWeight: 600, fontSize: 16 }}>
                                    Электронная почта
                                </Text>
                            }
                            name="name"
                            labelCol={{ span: 24 }}
                        >
                            <Input placeholder="E-mail" size="large" />
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
                            <Link to={ROUTES.LOGIN}>Назад</Link>
                        </Space>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
