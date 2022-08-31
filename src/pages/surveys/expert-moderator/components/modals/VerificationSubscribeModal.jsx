import { Button, Modal, Form, Input, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { SurveysSlice } from '../../../../../reducers/SurveysSlice'
import {
    useSendCodeMutation,
    useSendAnswerExpertMutation,
} from '../../../../../services/ExpertService'
import ROUTES from '../../../../../routes'

const { TextArea } = Input

const VerificationSubscribeModal = ({ id, main_expert }) => {
    const {
        subscribeCodeModal,
        conclusion_first_part,
        conclusion_second_part,
        pass_practical_part,
        pass_test_part,
    } = useSelector((state) => state.survey_slice)
    const { openSubscribeModal } = SurveysSlice.actions

    const [sendCode] = useSendCodeMutation()
    const [sendAnswerExpert] = useSendAnswerExpertMutation()

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinishSubmit = (data) => {
        const body = {
            conclusion_first_part: conclusion_first_part,
            conclusion_second_part: conclusion_second_part,
        }

        const bodyMainModerator = {
            conclusion_first_part: conclusion_first_part,
            conclusion_second_part: conclusion_second_part,
            pass_practical_part: pass_practical_part,
            pass_test_part: pass_test_part,
        }
        sendCode(data).then((res) => {
            if (res.data) {
                sendAnswerExpert({
                    id: id,
                    body: main_expert ? bodyMainModerator : body,
                }).then((res) => {
                    if (res.data) {
                        dispatch(openSubscribeModal(false))
                        navigate(ROUTES.TEST_PROCESSING)
                        message.success(
                            'Вы подтвердили экспертизу и результаты экзамена отправлены!'
                        )
                    } else {
                        message.error('Вы не подтвердили')
                    }
                })
            } else {
                message.error('Вы не подтвердили')
            }
        })
    }

    const handleClose = () => {
        dispatch(openSubscribeModal(false))
    }

    return (
        <>
            <Modal
                title="Подтверждение"
                visible={subscribeCodeModal}
                onOk={handleClose}
                onCancel={handleClose}
                footer={[
                    <Button
                        size="medium"
                        style={{
                            borderRadius: 4,
                        }}
                        key="save"
                        form="subscribe-code-form"
                        type="primary"
                        htmlType="submit"
                    >
                        Отправить
                    </Button>,
                ]}
            >
                <Form id="subscribe-code-form" onFinish={onFinishSubmit}>
                    <Form.Item
                        required
                        label="Мы отправили письмо с кодом подтверждения Вам на почту."
                        labelCol={{ span: 24 }}
                        name="code"
                    >
                        <Input placeholder="Код" />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default VerificationSubscribeModal
