/* eslint-disable react/prop-types */
// import { useNavigate } from 'react-router-dom'
import { Modal, Radio, Space } from 'antd'

// import ROUTES from '../../../../../routes'

const SwitchQuestionModal = ({ open, setOpen }) => {
    // const navigate = useNavigate()

    const handleChange = () => {}

    return (
        <Modal
            visible={open}
            onCancel={() => setOpen(false)}
            title="Выбор типа вопроса"
            footer={[]}
        >
            <Radio.Group onChange={handleChange}>
                <Space direction="vertical">
                    <Radio value={'Hard'}>Hard вопрос</Radio>
                    <Radio value={'Soft'}>Soft вопрос</Radio>
                </Space>
            </Radio.Group>
        </Modal>
    )
}

export default SwitchQuestionModal
