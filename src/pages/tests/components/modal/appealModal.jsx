import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Modal, Input, Typography, message, Form } from 'antd'
import moment from 'moment'

import { useGetSurveysIdQuery, useAppealPostMutation } from '../../../../services/SurveysService'
import { Line, MyButton } from '../../../../components'
import ROUTES from '../../../../routes'

const { Text } = Typography

const AppealModal = ({ open, setOpen, ID }) => {
    const success = () => {
        Modal.success({
            content: 'Аппеляция отправлена!',
        })
    }
    const [appealPost] = useAppealPostMutation()
    const navigate = useNavigate()
    const [confirmModal, setConfirmModal] = useState(false)
    const onSubmit = (data) => {
        appealPost({ id: ID, body: data }).then((res) => {
            if (res.data) {
                message.success('Квалификация создана')
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
