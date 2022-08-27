import React from 'react'
import { Form, Input, Button, Typography, Space, message } from 'antd'
import { useDispatch } from 'react-redux'

import { useRegisterVerifyVersionMutation } from '../../../../services/LoginService'
import { RegisterVersionSlice } from '../../../../reducers/RegisterVersionSlice'

const { Text } = Typography

const RegisterVerify = () => {
    const [postRegisterVerify] = useRegisterVerifyVersionMutation()
    const { handleOpenVerifyVersion, handleOpenProfileVersion, handleOpenEmailVersion, addedCode } =
        RegisterVersionSlice.actions

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        postRegisterVerify(data).then((res) => {
            if (res.data) {
                dispatch(handleOpenVerifyVersion(false))
                dispatch(handleOpenProfileVersion(true))
                dispatch(addedCode(data.code))
            } else {
                message.error(res.error.data.errors[0])
            }
        })
    }

    return (
        <Form style={{ width: '100%' }} onFinish={onSubmit}>
            <Text style={{ fontWeight: 600, fontSize: 16 }}>
                Мы отправили Вам письмо с кодом подтверждения.
            </Text>
            <Form.Item
                style={{ marginBottom: 10, marginTop: 10 }}
                required
                rules={[
                    {
                        required: true,
                        message: 'Пожалуйста введите верификационный код',
                    },
                ]}
                label={<Text style={{ fontWeight: 600, fontSize: 16 }}>Верификационный код</Text>}
                name="code"
                labelCol={{ span: 24 }}
            >
                <Input placeholder="Код" size="large" type="number" />
            </Form.Item>
            <Text style={{ color: '#0D6EFD', fontSize: 16 }}>Отправить код повторно: 59</Text>
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
            <Space
                style={{
                    marginBottom: '-12px',
                    marginTop: 12,
                }}
                direction="vertical"
            >
                <Text
                    style={{
                        color: '#0D6EFD',
                        cursor: 'pointer',
                        fontSize: 16,
                    }}
                    onClick={() => {
                        dispatch(handleOpenVerifyVersion(false))
                        dispatch(handleOpenEmailVersion(true))
                    }}
                >
                    Назад
                </Text>
            </Space>
        </Form>
    )
}

export default RegisterVerify
