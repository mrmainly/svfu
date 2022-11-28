/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom'
import { Modal, Radio, Space } from 'antd'
import { useDispatch } from 'react-redux'

import ROUTES from '../../../../../routes'
import { ConstructorQuestionSlice } from '../../../../../reducers/ConstructorQuestionSlice'

const SwitchQuestionModal = ({ open, setOpen }) => {
    const { handleQuestionType } = ConstructorQuestionSlice.actions

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        navigate(ROUTES.MANAGER_QUESTIONS_CREATE_PAGE)
        dispatch(handleQuestionType(e.target.value))
    }

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
