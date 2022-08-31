import { Modal } from 'antd'
import { useNavigate } from 'react-router-dom'

import { MyButton } from '../../../../../components'
import {
    useSurveyPostMutation,
    usePracticalPartPostMutation,
    useGetPracticalPartIdQuery,
} from '../../../../../services/SurveysService'
import ROUTES from '../../../../../routes'

const TimeIsUpModal = ({ open, setOpen, id }) => {
    const [postSurvey] = useSurveyPostMutation()
    const [practicalPartPost] = usePracticalPartPostMutation()

    const { data: practical_data } = useGetPracticalPartIdQuery({ id: id })

    const navigate = useNavigate()

    const onFinishSubmit = () => {
        let formData = new FormData()
        formData.append('q_id', practical_data?.surveyquest[0]?.question.id)
        formData.append('describe', '')
        postSurvey({ body: { answers: [] }, id: id })
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
                onCancel={handleClose}
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

export default TimeIsUpModal
