import React from 'react'
import { Modal, Input, message, Form } from 'antd'
import PropTypes from 'prop-types'

import { useAppealPostMutation } from '../../../../../services/tester/Results'
import { MyButton } from '../../../../../components'

const AppealModal = ({ open, setOpen, ID }) => {
    const [appealPost] = useAppealPostMutation()

    const onSubmit = (data) => {
        appealPost({ id: ID, body: data }).then((res) => {
            if (res.data) {
                Modal.success({
                    content: 'Апелляция подана!',
                })
                setOpen(false)
            } else {
                message.error(res.error.data.errors[0])
            }
        })
    }

    return (
        <div>
            <Modal
                destroyOnClose={true}
                title="АПЕЛЛЯЦИЯ"
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
                        label="Пожалуйста, напишите причину подачи заявления."
                        name="appeal_text"
                    >
                        <Input.TextArea rows={6}></Input.TextArea>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

AppealModal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    ID: PropTypes.number,
}

export default AppealModal
