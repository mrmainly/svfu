import React from 'react'
import { Modal, Input, Form, message, Button } from 'antd'
import PropTypes from 'prop-types'

import { MyButton } from '../../../../../components'
import {
    usePatchAttestationsTagMutation,
    useDeleteAttestationsTagMutation,
} from '../../../../../services/manager/Tags'

const TagsEditModal = ({ data, open, handleClose }) => {
    const [patchAttestationsTag] = usePatchAttestationsTagMutation()
    const [deleteAttestationsTag] = useDeleteAttestationsTagMutation()

    const onSubmit = (dataForm) => {
        patchAttestationsTag({ body: dataForm, id: data?.id }).then((res) => {
            if (res.data) {
                message.success('Тег редактирован')
                handleClose()
            } else {
                message.error('Тег не редактирован')
            }
        })
    }

    const handleDelete = () => {
        deleteAttestationsTag({ id: data?.id }).then((res) => {
            if (res.data) {
                message.success('Тег удален')
                handleClose()
            } else {
                message.error('Тег не удален')
            }
        })
    }

    return (
        <Modal
            destroyOnClose={true}
            title="Редактирование тегов"
            visible={open}
            onOk={handleClose}
            onCancel={handleClose}
            footer={[
                <MyButton key="submit" htmlType="submit" form="form-tag-edit-modal">
                    Сохранить
                </MyButton>,
                <Button key="delete" danger size="large" type="primary" onClick={handleDelete}>
                    Удалить
                </Button>,
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
                initialValues={{
                    ['name']: data?.name,
                }}
                onFinish={onSubmit}
                id="form-tag-edit-modal"
            >
                <Form.Item label="Название тега" name="name">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    )
}

TagsEditModal.propTypes = {
    data: PropTypes.object,
    open: PropTypes.bool,
    handleClose: PropTypes.func,
}

export default TagsEditModal
