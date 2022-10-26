import React, { useState } from 'react'
import { Button, Modal, Form, Input, Checkbox, message, Radio, Spin } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { SurveysSlice } from '../../../../../reducers/SurveysSlice'
import { useSendSubscribeExpertMutation } from '../../../../../services/expert/Surveys'
import ExpertSoftReviewCard from '../cards/expert_soft_review_card'

const { TextArea } = Input

const SoftAnswerExpertModal = ({ id, expert_review, main_expert }) => {
    const { main_score } = useSelector((state) => state.survey_slice)
    const [subscribe, setSubscribe] = useState(false)
    const [sendSubscribeExpert, { isLoading }] = useSendSubscribeExpertMutation()

    const { expertTheoreticalPartModalOpen } = useSelector((state) => state.survey_slice)
    const { openExpertTheoreticalPartOpen, openSubscribeModal, setTextAnswerExpert } =
        SurveysSlice.actions

    const dispatch = useDispatch()

    const onFinishSubmit = (data) => {
        dispatch(
            setTextAnswerExpert([
                data.conclusion_first_part,
                data.conclusion_second_part,
                data.pass_practical_part,
                data.pass_test_part,
            ])
        )
        sendSubscribeExpert({ id: id }).then((res) => {
            if (res.data) {
                dispatch(openExpertTheoreticalPartOpen(false))
                dispatch(openSubscribeModal(true))
                console.log(data)
            } else {
                message.error('Вы не оставили рекомендацию')
            }
        })
    }

    const handleClose = () => {
        dispatch(openExpertTheoreticalPartOpen(false))
    }

    const onChange = (e) => {
        setSubscribe(e.target.checked)
    }

    return (
        <Modal
            title="Заключение"
            visible={expertTheoreticalPartModalOpen}
            onOk={handleClose}
            onCancel={handleClose}
            footer={[
                <Button
                    size="medium"
                    style={{
                        borderRadius: 4,
                    }}
                    key="save"
                    form="form-expert-soft"
                    type="primary"
                    disabled={!subscribe ? true : false}
                    htmlType="submit"
                >
                    Отправить
                </Button>,
                <Button
                    size="medium"
                    style={{
                        background: '#6C757D',
                        color: 'white',
                        borderRadius: 4,
                    }}
                    onClick={handleClose}
                    key="back"
                >
                    Отмена
                </Button>,
            ]}
        >
            {isLoading && (
                <Spin
                    style={{
                        position: 'absolute',
                        top: '50%',
                        zIndex: 1,
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                    size="large"
                />
            )}
            <div style={{ opacity: isLoading ? 0.5 : 1 }}>
                {main_expert && (
                    <div style={{ marginBottom: 20 }}>
                        {expert_review.length &&
                            expert_review.map((item, index) => (
                                <ExpertSoftReviewCard
                                    key={index}
                                    expert_name={item.user}
                                    recommendationPartOne={item.conclusion_first_part}
                                    id={item.user_id}
                                />
                            ))}
                    </div>
                )}

                <Form id="form-expert-soft" onFinish={onFinishSubmit}>
                    <Form.Item
                        required
                        label={main_expert ? 'Рекомендация к тесту' : 'Заключение по тесту'}
                        labelCol={{ span: 24 }}
                        name="conclusion_first_part"
                    >
                        <TextArea
                            placeholder={
                                main_expert
                                    ? 'Рекомендация к тесту'
                                    : 'Введите заключение по практической части'
                            }
                            style={{ height: 150 }}
                        />
                    </Form.Item>
                    {main_expert && (
                        <>
                            <Form.Item
                                label="Результат экзамена"
                                labelCol={{ span: 24 }}
                                name="pass_test_part"
                            >
                                <Radio.Group>
                                    <Radio value={true}>Сдано</Radio>
                                    <Radio value={false}>Не сдано</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item>Сумма баллов за тест: {main_score}</Form.Item>
                        </>
                    )}
                </Form>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Checkbox onChange={onChange}>
                        Подписать <span style={{ color: '#2F80ED' }}>протокол</span>
                    </Checkbox>
                </div>
            </div>
        </Modal>
    )
}

SoftAnswerExpertModal.propTypes = {
    id: PropTypes.number,
    expert_review: PropTypes.array,
    main_expert: PropTypes.bool,
}

export default SoftAnswerExpertModal
