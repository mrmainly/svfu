import React from 'react'
import { Typography, Form, Input, Button, Space, message } from 'antd'
import '../forgot_password.css'
import { useDispatch } from 'react-redux'

import { usePostVerifyCodeMutation } from '../../../../services/auth/Tools'
import { ForgotVersionSlice } from '../../../../reducers/ForgotVersionSlice'

const { Text } = Typography

const PasswordForm = () => {
    const [postForgotVerify] = usePostVerifyCodeMutation()
    const {
        handleOpenEmailFormVersion,
        handleOpenVerifyFormVersion,
        handleOpenPasswordFormVersion,
        addedCode,
    } = ForgotVersionSlice.actions

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        postForgotVerify(data)
            .then((res) => {
                if (res.data) {
                    dispatch(handleOpenPasswordFormVersion(true))
                    dispatch(handleOpenVerifyFormVersion(false))
                    dispatch(addedCode(data.code))
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
                    textAlign: 'start',
                }}
            >
                Мы отправили Вам письмо с кодом подтверждения.
            </Text>
            <Form style={{ width: '100%' }} onFinish={onSubmit}>
                <Form.Item
                    style={{ marginBottom: 10, marginTop: 10 }}
                    required
                    rules={[
                        {
                            required: true,
                            message: 'Пожалуйста введите верификационный код',
                        },
                    ]}
                    label={
                        <Text style={{ fontWeight: 600, fontSize: 16 }}>Верификационный код</Text>
                    }
                    name="code"
                    labelCol={{ span: 24 }}
                >
                    <Input placeholder="Код" size="large" type="number" />
                </Form.Item>
                <Button
                    style={{
                        background: '#0D6EFD',
                        width: '100%',
                        borderRadius: 4,
                        marginTop: 10,
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
                        onClick={() => {
                            dispatch(handleOpenEmailFormVersion(true))
                            dispatch(handleOpenVerifyFormVersion(false))
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
