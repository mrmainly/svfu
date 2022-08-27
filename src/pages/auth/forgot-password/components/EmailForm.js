import React from 'react'
import { Typography, Form, Input, Button, Space, message } from 'antd'
import { Link } from 'react-router-dom'
import '../forgot_password.css'
import { useDispatch } from 'react-redux'

import ROUTES from '../../../../routes'
import { useForgotEmailVersionMutation } from '../../../../services/LoginService'
import { ForgotVersionSlice } from '../../../../reducers/ForgotVersionSlice'

const { Text } = Typography

const EmailForm = () => {
    const [postEmailForgot] = useForgotEmailVersionMutation()
    const { handleOpenEmailFormVersion, handleOpenVerifyFormVersion } = ForgotVersionSlice.actions

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        postEmailForgot(data)
            .then((res) => {
                if (res.data) {
                    dispatch(handleOpenEmailFormVersion(false))
                    dispatch(handleOpenVerifyFormVersion(true))
                } else {
                    message.error(res.error.data.errors[0])
                }
            })
            .catch((error) => console.log(error))
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
                }}
            >
                Введите вашу почту, которую вы ввели при регистрации. Если вы забыли адрес
                электронной почты, проверьте данные.
            </Text>
            <Form style={{ width: '100%' }} onFinish={onSubmit}>
                <Form.Item
                    label={<Text style={{ fontWeight: 600, fontSize: 16 }}>Электронная почта</Text>}
                    name="email"
                    required
                    rules={[
                        {
                            required: true,
                            message: 'Введите почту',
                        },
                    ]}
                    labelCol={{ span: 24 }}
                >
                    <Input placeholder="E-mail" size="large" />
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
                    <Link to={ROUTES.LOGIN}>Назад</Link>
                </Space>
            </Form>
        </div>
    )
}

export default EmailForm
