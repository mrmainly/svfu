import React from 'react'
import { Modal, Input, Form, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import { MyButton } from '../../../../../components'
import { usePutUserApplicationRejectMutation } from '../../../../../services/tutor/UserApplication'
import ROUTES from '../../../../../routes'

const { TextArea } = Input

const RejectModal = ({ open, setOpen, id }) => {
    const navigate = useNavigate()

    const [putUserApplicationReject] = usePutUserApplicationRejectMutation()

    const onSubmit = (data) => {
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

RejectModal.propTypes = {
    id: PropTypes.string,
    open: PropTypes.bool,
    setOpen: PropTypes.func,
}

export default RejectModal
