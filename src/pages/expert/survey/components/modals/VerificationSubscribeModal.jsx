import { Button, Modal, Form, Input, message } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import { SurveysSlice } from '../../../../../reducers/SurveysSlice'
import { useSendAnswerExpertMutation } from '../../../../../services/expert/Surveys'
import { useSendCodeMutation } from '../../../../../services/ToolsService'
import ROUTES from '../../../../../routes'

const VerificationSubscribeModal = ({ id, main_expert, unit_type }) => {
    const {
        soft_review,
        subscribeCodeModal,
        conclusion_first_part,
        conclusion_second_part,
        pass_practical_part,
        pass_test_part,
        main_score,
    } = useSelector((state) => state.survey_slice)
    const { openSubscribeModal } = SurveysSlice.actions
    const [sendCode] = useSendCodeMutation()
    const [sendAnswerExpert] = useSendAnswerExpertMutation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onFinishSubmit = (data) => {
        const bodyHard = {
            conclusion_first_part: conclusion_first_part,
            conclusion_second_part: conclusion_second_part,
        }

        const bodySoft = {
            conclusion_first_part: conclusion_first_part,
            soft_review: soft_review,
        }
        const bodyMainExpertSoft = {
            conclusion_first_part: conclusion_first_part,
            pass_test_part: pass_test_part,
            soft_review: soft_review,
            main_score: main_score,
        }
        const bodyMainExpertHard = {
            conclusion_first_part: conclusion_first_part,
            conclusion_second_part: conclusion_second_part,
            pass_practical_part: pass_practical_part,
            pass_test_part: pass_test_part,
        }
        sendCode(data).then((res) => {
            if (res.data) {
                sendAnswerExpert({
                    id: id,
                    body:
                        main_expert && unit_type === 'SOFT'
                            ? bodyMainExpertSoft
                            : main_expert && unit_type === 'HARD'
                            ? bodyMainExpertHard
                            : !main_expert && unit_type === 'SOFT'
                            ? bodySoft
                            : bodyHard,
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

VerificationSubscribeModal.propTypes = {
    id: PropTypes.number,
    main_expert: PropTypes.bool,
    unit_type: PropTypes.string,
}

export default VerificationSubscribeModal
