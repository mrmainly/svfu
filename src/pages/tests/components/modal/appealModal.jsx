import React, { useState } from 'react'
import { Modal, Input, Typography, message, Form } from 'antd'

import { useAppealPostMutation } from '../../../../services/SurveysService'
import { MyButton } from '../../../../components'

const { Text } = Typography

const AppealModal = ({ open, setOpen, ID }) => {
    const [appealPost] = useAppealPostMutation()
    const [confirmModal, setConfirmModal] = useState(false)
    const onSubmit = (data) => {
        appealPost({ id: ID, body: data }).then((res) => {
            if (res.data) {
                Modal.success({
                    content: 'Аппеляция отправлена!',
                })
                setOpen(false)
            } else {
                message.error(res.error.data.errors[0])
            }
            console.log(res)
        })
    }

    return (
        <div>
            <Modal
                destroyOnClose={true}
                title="АППЕЛЯЦИЯ"
                visible={open}
                onOk={() => {
                    setOpen(false)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
                footer={[
                    <MyButton key="submit" htmlType="submit" form="appeal-form">
                        Отправить
                    </MyButton>,
                    <MyButton
                        key="back"
                        type="default"
                        style={{ background: '#FFF' }}
                        onClick={() => setOpen(false)}
                    >
                        Отмена
                    </MyButton>,
                ]}
            >
                <Form layout="vertical" onFinish={onSubmit} id="appeal-form">
                    <Form.Item
                        label="Пожалуйста, напишите причину подачи завяления."
                        name="appeal_text"
                    >
                        <Input.TextArea rows={6}></Input.TextArea>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default AppealModal
