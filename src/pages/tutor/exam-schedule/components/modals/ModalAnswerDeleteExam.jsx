import { Modal, Button, message, Input, Form } from 'antd'

import { useDeleteTutorExamMutation } from '../../../../../services/TutorService'

import PropTypes from 'prop-types'

const { TextArea } = Input

const ModalAnswerDeleteExam = ({ open, handleClose, currentData, setOpen }) => {
    const [deleteTutorExam, { isLoading }] = useDeleteTutorExamMutation()

    const handleDeleteTutorExam = (data) => {
        deleteTutorExam({ id: currentData.id, data }).then((res) => {
            if (res.data) {
                message.success('Экзамен принудительно отменен')
                handleClose()
                setOpen(false)
            } else {
                message.error('что то пошло не так')
            }
        })
    }

    return (
        <div>
            <Modal
                destroyOnClose={true}
                title="Отмена теста"
                visible={open}
                onCancel={handleClose}
                footer={[
                    <Button
                        key="delete"
                        type="danger"
                        size="large"
                        form="deleteExamForm"
                        htmlType="submit"
                    >
                        Отменить
                    </Button>,
                ]}
            >
                <Form
                    onFinish={handleDeleteTutorExam}
                    id="deleteExamForm"
                    layout="vertical"
                    style={{ opacity: isLoading ? 0.5 : 1 }}
                >
                    <Form.Item name="reason" label="Причина" required>
                        <TextArea placeholder="Опишите причину отмены" style={{ height: 200 }} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

ModalAnswerDeleteExam.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    currentData: PropTypes.object,
    setOpen: PropTypes.func,
}

export default ModalAnswerDeleteExam
