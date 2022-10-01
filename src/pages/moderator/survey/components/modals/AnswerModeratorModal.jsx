import React, { useState } from 'react'
import {
    Button,
    Modal,
    Form,
    Input,
    Checkbox,
    message,
    Select,
    Typography,
    Divider,
    Spin,
} from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { SurveysSlice } from '../../../../../reducers/SurveysSlice'
import { useSendSubscribeExpertMutation } from '../../../../../services/expert/Surveys'
import ModeratorReviewCard from '../cards/moderator_review_card'
const { TextArea } = Input

const AnswerTheoreticalPartModeratorModal = ({ id, surveyquest }) => {
    const [subscribe, setSubscribe] = useState(false)

    const [sendSubscribeExpert, { isLoading }] = useSendSubscribeExpertMutation()

    const { expertTheoreticalPartModalOpen } = useSelector((state) => state.survey_slice)
    const { openExpertTheoreticalPartOpen, openSubscribeModalModerator, setTextAnswerModerator } =
        SurveysSlice.actions

    const dispatch = useDispatch()

    const onFinishSubmit = (data) => {
        dispatch(setTextAnswerModerator([data.estimate, data.conclusion]))
        sendSubscribeExpert({ id: id }).then((res) => {
            if (res.data) {
                dispatch(openExpertTheoreticalPartOpen(false))
                dispatch(openSubscribeModalModerator(true))
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
    const info = [
        {
            title: 'Заключение по теоретической части',
            recomendation: {
                name: 'Рекомендация:',
                label: surveyquest?.main_expert_review_first_part,
            },
        },
        {
            title: 'Заключение практической части',
            recomendation: {
                name: 'Рекомендация:',
                label: surveyquest?.main_expert_review_second_part,
            },
        },
    ]
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
                    form="form-moderator-theoretical-part"
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
                {info.map((item, index) => (
                    <div key={index}>
                        <Typography.Text
                            style={{
                                marginBottom: '16px',
                                fontFamily: 'Roboto',
                                fontWeight: '400',
                                fontStyle: 'italic',
                                fontSize: '18px',
                                lineHeight: '27px',
                            }}
                        >
                            {item.title}
                        </Typography.Text>
                        <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                            <Typography.Text
                                style={{
                                    width: '120px',
                                    fontFamily: 'Roboto',
                                    fontWeight: '500',
                                    fontSize: '16px',
                                    lineHeight: '24px',
                                }}
                            >
                                {item.recomendation.name}
                            </Typography.Text>
                            <Typography.Text
                                style={{
                                    fontFamily: 'Roboto',
                                    fontWeight: '500',
                                    fontSize: '16px',
                                    lineHeight: '24px',
                                }}
                            >
                                {item.recomendation.label}
                            </Typography.Text>
                        </div>
                    </div>
                ))}
                {surveyquest?.main_moderator && (
                    <div style={{ marginTop: '8px' }}>
                        <Typography
                            style={{
                                marginBottom: '16px',
                                fontFamily: 'Roboto',
                                fontWeight: '400',
                                fontStyle: 'italic',
                                fontSize: '18px',
                                lineHeight: '27px',
                            }}
                        >
                            Решения модераторов
                        </Typography>
                        {surveyquest?.moderator_review?.length &&
                            surveyquest.moderator_review.map((item, index) => (
                                <ModeratorReviewCard
                                    key={index}
                                    moderator_name={item.user_id}
                                    recommendation={item.conclusion}
                                    estimate={item.estimate}
                                />
                            ))}
                    </div>
                )}

                <Divider />
                <Form id="form-moderator-theoretical-part" onFinish={onFinishSubmit}>
                    <Form.Item required label="Аттестация" labelCol={{ span: 24 }} name="estimate">
                        <Select>
                            <Select.Option value="WAITING">Ожидание</Select.Option>
                            <Select.Option value="CERTIFIED">Aттестован</Select.Option>
                            <Select.Option value="CERTIFIED_WITH_ENCOURAGEMENT">
                                Аттестован с поощрением
                            </Select.Option>
                            <Select.Option value="CERTIFIED_UNDER_CERTAIN_CONDITIONS">
                                Аттестован при определенных условиях
                            </Select.Option>
                            <Select.Option value="NOT_CERTIFIED">Не аттестован</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        required
                        label="Рекомендация"
                        labelCol={{ span: 24 }}
                        name="conclusion"
                    >
                        <TextArea placeholder="Рекомендация" style={{ height: 200 }} />
                    </Form.Item>
                </Form>
                <Checkbox onChange={onChange}>Подписать протокол</Checkbox>
            </div>
        </Modal>
    )
}

AnswerTheoreticalPartModeratorModal.propTypes = {
    id: PropTypes.number,
    surveyquest: PropTypes.array,
}

export default AnswerTheoreticalPartModeratorModal
