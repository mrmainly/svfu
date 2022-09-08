import React, { useState } from 'react'
import { Button, Modal, Form, Input, Checkbox, message, Typography } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { SurveysSlice } from '../../../../../reducers/SurveysSlice'
import { useSendSubscribeExpertMutation } from '../../../../../services/ExpertService'
import ExpertReviewCard from '../cards/expert_review_card'

const { TextArea } = Input

const { Title } = Typography

const AnswerTheoreticalPartExpertModal = ({ id, expert_review, main_expert }) => {
    const [subscribe, setSubscribe] = useState(false)

    const [sendSubscribeExpert] = useSendSubscribeExpertMutation()

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
        <>
            <Modal
                title="Вы уверены?"
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
                        form="form-expert-theoretical-part"
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
                {main_expert && (
                    <div style={{ marginBottom: 20 }}>
                        <div>
                            <Title level={5} style={{ marginBottom: 20 }}>
                                Заключения по теоретической части
                            </Title>
                            {expert_review.length &&
                                expert_review.map((item, index) => (
                                    <ExpertReviewCard
                                        key={index}
                                        expert_name={item.user}
                                        recommendation={item.conclusion_first_part}
                                    />
                                ))}
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <Title level={5} style={{ marginBottom: 20 }}>
                                Заключения по практической части
                            </Title>
                            {expert_review.length &&
                                expert_review.map((item, index) => (
                                    <ExpertReviewCard
                                        key={index}
                                        expert_name={item.user}
                                        recommendation={item.conclusion_second_part}
                                    />
                                ))}
                        </div>
                    </div>
                )}
                <Form id="form-expert-theoretical-part" onFinish={onFinishSubmit}>
                    <Form.Item
                        required
                        label={
                            main_expert
                                ? 'Рекомендация по теоретической части'
                                : 'Заключение по теоретической части'
                        }
                        labelCol={{ span: 24 }}
                        name="conclusion_first_part"
                    >
                        <TextArea
                            placeholder={
                                main_expert
                                    ? 'Рекомендация к ответу'
                                    : 'Напишите заключение по теоретической части'
                            }
                            style={{ height: 150 }}
                        />
                    </Form.Item>
                    <Form.Item
                        required
                        label={
                            main_expert
                                ? 'Рекомендация по практической части'
                                : 'Заключение по практической части'
                        }
                        labelCol={{ span: 24 }}
                        name="conclusion_second_part"
                    >
                        <TextArea
                            placeholder={
                                main_expert
                                    ? 'Рекомендация к ответу'
                                    : 'Напишите заключение по теоретической части'
                            }
                            style={{ height: 150 }}
                        />
                    </Form.Item>
                    {main_expert ? (
                        <>
                            <Form.Item
                                label="Результат практической части"
                                labelCol={{ span: 24 }}
                                name="pass_practical_part"
                                valuePropName="checked"
                            >
                                <Checkbox>Сдано</Checkbox>
                            </Form.Item>
                            <Form.Item
                                label="Результат экзамена"
                                labelCol={{ span: 24 }}
                                name="pass_test_part"
                                valuePropName="checked"
                            >
                                <Checkbox>Сдано</Checkbox>
                            </Form.Item>
                        </>
                    ) : (
                        ''
                    )}
                </Form>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Checkbox onChange={onChange}>
                        Подписать <span style={{ color: '#2F80ED' }}>протокол</span>
                    </Checkbox>
                </div>
            </Modal>
        </>
    )
}

AnswerTheoreticalPartExpertModal.propTypes = {
    id: PropTypes.number,
    expert_review: PropTypes.array,
    main_expert: PropTypes.bool,
}

export default AnswerTheoreticalPartExpertModal
