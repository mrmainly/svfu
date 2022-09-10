import React from 'react'
import { Modal, Input, Form, message } from 'antd'
import PropTypes from 'prop-types'

import { MyButton } from '../../../../components'
import { usePostAttestationsTagMutation } from '../../../../services/AttestationService'

const TagsAddModal = ({ open, handleClose }) => {
    const [postAttestationsTag] = usePostAttestationsTagMutation()

    const onSubmit = (data) => {
        postAttestationsTag(data).then((res) => {
            if (res.data) {
                handleClose()
                message.success('Тег создан')
            } else {
                message.error('Такой тег уже создан')
            }
        })
    }

    return (
        <Modal
            destroyOnClose={true}
            title="Создание тегов"
            visible={open}
            onOk={handleClose}
            onCancel={handleClose}
            footer={[
                <MyButton key="submit" htmlType="submit" form="form-create-tag">
                    Сохранить
                </MyButton>,
                <MyButton
                    key="back"
                    type="default"
                    style={{
                        background: '#FFF',
                    }}
                    onClick={handleClose}
                >
                    Отмена
                </MyButton>,
            ]}
        >
            <Form
                layout="vertical"
                onFinish={onSubmit}
                style={{ marginBottom: '-20px' }}
                id="form-create-tag"
            >
                <Form.Item label="Название квалификации" name="name">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

TagsAddModal.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
}

export default TagsAddModal
