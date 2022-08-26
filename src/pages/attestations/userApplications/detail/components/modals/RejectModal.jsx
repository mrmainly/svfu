import React, { useState } from 'react'
import { Modal, Input, Form, message } from 'antd'
import { useNavigate } from 'react-router-dom'

import { MyButton } from '../../../../../../components'
import { usePutUserApplicationRejectMutation } from '../../../../../../services/TutorService'
import ROUTES from '../../../../../../routes'

const { TextArea } = Input

const RejectModal = ({ open, setOpen, id }) => {
    const [value, setValue] = useState('')

    const navigate = useNavigate()

    const [putUserApplicationReject] = usePutUserApplicationRejectMutation()

    const onSubmit = (data) => {
        console.log(data)
        putUserApplicationReject({ id: id, data }).then((res) => {
            if (res.data) {
                message.success('Вы отклонили заявление')
                navigate(ROUTES.USER_APPLICATIONS)
            } else {
                message.error(res.error.data.errors[0])
            }
        })
    }

    return (
        <div>
            <Modal
                title="Отказ"
                visible={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={[
                    <MyButton key="true" type="primary" form="reject-form" htmlType="submit">
                        ОК
                    </MyButton>,
                    <MyButton key="back" type="primary" onClick={() => setOpen(false)}>
                        Отмена
                    </MyButton>,
                ]}
            >
                <Form
                    onFinish={onSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                    }}
                    id="reject-form"
                >
                    <Form.Item name="reason">
                        <TextArea style={{ height: 150 }} placeholder="Напишите причину отказа" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default RejectModal
