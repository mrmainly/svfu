import { Modal, Button, message, Input, Form } from 'antd'

import { useDeleteTutorExamMutation } from '../../../../services/TutorService'

import PropTypes from 'prop-types'

const { TextArea } = Input

const ModalAnswerDeleteExam = ({ open, setOpen, currentData }) => {
    const [deleteTutorExam] = useDeleteTutorExamMutation()

    const handleDeleteTutorExam = (data) => {
        deleteTutorExam({ id: currentData.id, data }).then((res) => {
            if (res.data) {
                message.success('Экзамен принудительно отменен')
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
                onCancel={() => setOpen(false)}
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
                <Form onFinish={handleDeleteTutorExam} id="deleteExamForm" layout="vertical">
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
    setOpen: PropTypes.func,
    currentData: PropTypes.object,
}

export default ModalAnswerDeleteExam
