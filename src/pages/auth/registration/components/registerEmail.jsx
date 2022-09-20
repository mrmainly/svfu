import React from 'react'
import { Form, Input, Button, Typography, Space, message } from 'antd'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import ROUTES from '../../../../routes'
import { useRegisterEmailVersionMutation } from '../../../../services/auth/Registration'
import { RegisterVersionSlice } from '../../../../reducers/RegisterVersionSlice'

const { Text } = Typography

const RegisterEmail = () => {
    const [postRegisterEmail] = useRegisterEmailVersionMutation()
    const { handleOpenEmailVersion, handleOpenVerifyVersion } = RegisterVersionSlice.actions

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        postRegisterEmail(data).then((res) => {
            if (res.data) {
                dispatch(handleOpenEmailVersion(false))
                dispatch(handleOpenVerifyVersion(true))
            } else {
                message.error(res.error.data.errors[0])
            }
        })
    }

    return (
        <Form style={{ width: '100%' }} onFinish={onSubmit}>
            <Form.Item
                label={<Text style={{ fontWeight: 600, fontSize: 16 }}>Почта</Text>}
                name="email"
                required
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите почту',
                    },
                ]}
                labelCol={{ span: 24 }}
            >
                <Input placeholder="Введите вашу почту" size="large" />
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
            <Space
                style={{
                    marginBottom: '-12px',
                    marginTop: 12,
                }}
                direction="vertical"
            >
                <Link to={ROUTES.LOGIN}>Есть аккаунт? Войти</Link>
                <Link to={ROUTES.FORGOT_PASSWORD}>Восстановление пароля</Link>
            </Space>
        </Form>
    )
}

export default RegisterEmail
