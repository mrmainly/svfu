import { Button, Modal, message } from 'antd'
import { useNavigate } from 'react-router-dom'

import { MyButton } from '../../../../../components'
import { useSurveyPostMutation } from '../../../../../services/SurveysService'
import ROUTES from '../../../../../routes'

const TimeIsUpModal = ({ open, setOpen, text, id, postData }) => {
    const [postSurvey] = useSurveyPostMutation()

    const navigate = useNavigate()

    const onFinishSubmit = () => {
        postSurvey({ body: postData, id: id }).then((res) => {
            console.log(res)
            if (res.data) {
                if (res.data.survey_status === 'NOT_PASSED') {
                    message.error('Вы не прошли тестовую часть')
                    navigate(ROUTES.PROFILE)
                } else {
                    navigate(ROUTES.PRACTICAL_PART, {
                        state: { id: id },
                    })
                }
            }
        })
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Modal
                title="Вы уверены?"
                visible={open}
                onOk={handleClose}
                onCancel={handleClose}
                footer={[
                    <MyButton size="medium" onClick={onFinishSubmit}>
                        Закончить тестирование
                    </MyButton>,
                    <Button
                        size="medium"
                        style={{ background: '#6C757D', color: 'white', borderRadius: 4 }}
                        onClick={handleClose}
                    >
                        Отмена
                    </Button>,
                ]}
            >
                <p>Закончив тестирование, вы не сможете изменить свои ответы на вопросы</p>
            </Modal>
        </>
    )
}

export default TimeIsUpModal
