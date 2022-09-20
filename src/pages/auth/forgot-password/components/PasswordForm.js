import React from 'react'
import { Typography, Form, Input, Button, Space, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import '../forgot_password.css'
import { useDispatch, useSelector } from 'react-redux'

import { useForgotPasswordVersionMutation } from '../../../../services/auth/ForgotPassword'
import { ForgotVersionSlice } from '../../../../reducers/ForgotVersionSlice'
import ROUTES from '../../../../routes'

const { Text } = Typography

const PasswordForm = () => {
    const [postForgotPassword] = useForgotPasswordVersionMutation()
    const { handleOpenEmailFormVersion, handleOpenPasswordFormVersion } = ForgotVersionSlice.actions
    const { code } = useSelector((state) => state.forgot_version_slice)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onSubmit = (data) => {
        if (data.password === data.password_verify) {
            delete data.password_verify
            data.code = code
            postForgotPassword(data)
                .then((res) => {
                    if (res.data) {
                        dispatch(handleOpenPasswordFormVersion(false))
                        dispatch(handleOpenEmailFormVersion(true))
                        navigate(ROUTES.LOGIN)
                    } else {
                        message.error(res.error.data.errors[0])
                    }
                })
                .catch((error) => console.log(error))
        } else {
            message.error('Пароль не подошел')
        }
    }

    return (
        <div className="form">
            <Text
                style={{
                    fontWeight: 400,
                    fontSize: 18,
                    fontStyle: 'normal',
                }}
            >
                ВОССТАНОВЛЕНИЕ ПАРОЛЯ
            </Text>
            <Text
                style={{
                    fontWeight: 400,
                    fontSize: 16,
                    fontStyle: 'normal',
                    textAlign: 'start',
                }}
            >
                Придумайте новый пароль.
            </Text>
            <Form style={{ width: '100%' }} onFinish={onSubmit}>
                <Form.Item
                    label={<Text style={{ fontWeight: 600, fontSize: 16 }}>Новый пароль</Text>}
                    name="password"
                    required
                    rules={[
                        {
                            required: true,
                            message: 'Введите пароль',
                        },
                    ]}
                    labelCol={{ span: 24 }}
                >
                    <Input.Password placeholder="Пароль" size="large" />
                </Form.Item>
                <Form.Item
                    label={<Text style={{ fontWeight: 600, fontSize: 16 }}>Повторите пароль</Text>}
                    required
                    rules={[
                        {
                            required: true,
                            message: 'Повторите пароль',
                        },
                    ]}
                    name="password_verify"
                    labelCol={{ span: 24 }}
                >
                    <Input.Password placeholder="Пароль" size="large" />
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
                    Далее
                </Button>
                <Space style={{ marginTop: 12, marginBottom: '-12px' }} direction="vertical">
                    <Text
                        style={{
                            color: '#0D6EFD',
                            cursor: 'pointer',
                            fontSize: 16,
                        }}
                    >
                        Назад
                    </Text>
                </Space>
            </Form>
        </div>
    )
}

export default PasswordForm
