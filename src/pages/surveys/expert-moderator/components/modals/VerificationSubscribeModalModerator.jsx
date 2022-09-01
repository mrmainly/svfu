import { Button, Modal, Form, Input, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { SurveysSlice } from '../../../../../reducers/SurveysSlice'
import { useSendCodeMutation } from '../../../../../services/ExpertService'
import { useSendAnswerModeratorMutation } from '../../../../../services/ModeratorService'
import ROUTES from '../../../../../routes'

const { TextArea } = Input

const VerificationSubscribeModalModerator = ({ id }) => {
    const { estimate, conclusion, subscribeCodeModalModerator } = useSelector(
        (state) => state.survey_slice
    )

    const { openSubscribeModalModerator } = SurveysSlice.actions

    const [sendCode] = useSendCodeMutation()
    const [sendAnswerModerator] = useSendAnswerModeratorMutation()

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinishSubmit = (data) => {
        const body = {
            estimate: estimate,
            conclusion: conclusion,
        }

        sendCode(data).then((res) => {
            if (res.data) {
                sendAnswerModerator({
                    id: id,
                    body: body,
                }).then((res) => {
                    if (res.data) {
                        dispatch(openSubscribeModalModerator(false))
                        navigate(ROUTES.TEST_RESULT)
                        message.success(
                            'Вы подтвердили экспертизу и результаты экзамена отправлены!'
                        )
                    } else {
                        message.error('Вы не подтвердили2')
                    }
                })
            } else {
                message.error('Вы не подтвердили')
            }
        })
    }

    const handleClose = () => {
        dispatch(openSubscribeModalModerator(false))
    }

    return (
        <>
            <Modal
                title="Подтверждение"
                visible={subscribeCodeModalModerator}
                onOk={handleClose}
                onCancel={handleClose}
                footer={[
                    <Button
                        size="medium"
                        style={{
                            borderRadius: 4,
                        }}
                        key="save"
                        form="subscribe-code-form-moderator"
                        type="primary"
                        htmlType="submit"
                    >
                        Отправить
                    </Button>,
                ]}
            >
                <Form id="subscribe-code-form-moderator" onFinish={onFinishSubmit}>
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

export default VerificationSubscribeModalModerator
