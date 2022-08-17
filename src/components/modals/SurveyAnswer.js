import { Button, Modal } from 'antd'

import { MyButton } from '..'
import { useSurveyPostMutation } from '../../services/SurveysService'

const SurveyAnswer = ({ open, setOpen, text, id, postData }) => {
    const [postSurvey] = useSurveyPostMutation()

    const onFinishSubmit = () => {
        postSurvey({ body: postData, id: id }).then((res) => {
            console.log(res)
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

export default SurveyAnswer
