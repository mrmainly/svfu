import { Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import { MyButton } from '../../../../../components'

import {
    usePostResultPartOneMutation,
    useGetPracticalPartIdQuery,
    usePostPracticalPartMutation,
} from '../../../../../services/TesterService'

import ROUTES from '../../../../../routes'

const TimeIsUpModal = ({ open, setOpen, id }) => {
    const [postResultPartOne] = usePostResultPartOneMutation()
    const [practicalPartPost] = usePostPracticalPartMutation()

    const { data: practical_data } = useGetPracticalPartIdQuery({ id: id })

    const navigate = useNavigate()

    const onFinishSubmit = () => {
        const formData = new FormData()
        formData.append('q_id', practical_data?.surveyquest[0]?.question.id)
        formData.append('describe', '')
        postResultPartOne({ body: { answers: [] }, id: id })
        practicalPartPost({ body: formData, id: id })
        navigate(ROUTES.AVAILABLE_TESTS)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Modal
                title="Время истекло!"
                visible={open}
                onOk={handleClose}
                footer={[
                    <MyButton size="medium" onClick={onFinishSubmit} key="end">
                        Перейти к остальным тестам
                    </MyButton>,
                ]}
            >
                <p>Вы провалили тестирование</p>
            </Modal>
        </>
    )
}

TimeIsUpModal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    id: PropTypes.number,
}

export default TimeIsUpModal
