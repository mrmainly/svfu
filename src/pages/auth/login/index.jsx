import React from 'react'
import { Typography, Form, Input, Button, Divider, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import cookie from 'js-cookie'
import './login.css'

import ROUTES from '../../../routes'
import { useLoginMutation } from '../../../services/LoginService'

const { Text } = Typography

const Login = () => {
    const navigate = useNavigate()

    const [postLogin] = useLoginMutation()

    const onFinish = (values) => {
        postLogin({
            username: values.username,
            password: values.password,
        }).then((res) => {
            if (res.error) {
                message.error(res?.error?.data?.errors[0])
            } else {
                cookie.set('token', res.data.token)
                localStorage.setItem('role', JSON.stringify(res.data.role, null, '\t'))
                // navigate(ROUTES.PROFILE)
                window.location.href = ROUTES.PROFILE
            }
        })
    }

    return (
        <div>
            <div className="background_style">
                <div className="form">
                    <img src="/img/image11.svg" alt="" />
                    <Text
                        style={{
                            fontWeight: 400,
                            fontSize: 18,
                            fontStyle: 'normal',
                        }}
                    >
                        АВТОРИЗАЦИЯ
                    </Text>
                    <Form style={{ width: '100%' }} onFinish={onFinish}>
                        <Form.Item
                            label={<Text style={{ fontWeight: 600, fontSize: 16 }}>Логин</Text>}
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите ваш логин',
                                },
                            ]}
                            labelCol={{ span: 24 }}
                        >
                            <Input
                                style={{
                                    borderRadius: 4,
                                }}
                                placeholder="Логин"
                                size="large"
                            />
                        </Form.Item>
                        <Form.Item
                            label={<Text style={{ fontWeight: 600, fontSize: 16 }}>Пароль</Text>}
                            name="password"
                            labelCol={{ span: 24 }}
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите ваш пароль',
                                },
                            ]}
                        >
                            <Input.Password
                                style={{
                                    borderRadius: 4,
                                }}
                                placeholder="Пароль"
                                size="large"
                            />
                        </Form.Item>
                        <Button
                            style={{
                                background: '#0D6EFD',
                                width: '100%',
                                borderRadius: 4,
                            }}
                            type="primary"
                            htmlType="submit"
                            size="large"
                        >
                            Войти
                        </Button>
                        <Link
                            to={ROUTES.FORGOT_PASSWORD}
                            style={{
                                marginTop: 12,
                                float: 'right',
                                marginBottom: 24,
                            }}
                        >
                            Забыли пароль?
                        </Link>
                        <Divider style={{ marginBottom: 24 }} />
                        <Button
                            style={{
                                background: '#09304A',
                                width: '100%',
                                borderRadius: 4,
                                color: 'white',
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
    )
}

export default Login
