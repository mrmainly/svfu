import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Modal, message, Typography } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import PropTypes from 'prop-types'

import { SurveysSlice } from '../../../../../reducers/SurveysSlice'
import {
    usePutAppealRejectIdMutation,
    usePutAppealAcceptIdMutation,
} from '../../../../../services/moderator/AttestedAppeal'
import { statusChoices } from '../../../../../constants'
import ModeratorReviewCard from '../cards/moderator_review_card'

import ROUTES from '../../../../../routes'

const { Title, Text } = Typography

const AppealModeratorModal = ({ id, surveyquest, appeal_text }) => {
    const [AppealReject] = usePutAppealRejectIdMutation()
    const [AppealAccept] = usePutAppealAcceptIdMutation()

    const { expertTheoreticalPartModalOpen } = useSelector((state) => state.survey_slice)
    const { openExpertTheoreticalPartOpen } = SurveysSlice.actions

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinishSubmit = () => {
        AppealAccept({ id: id }).then((res) => {
            if (res.data) {
                Modal.success({
                    title: 'Принято',
                    content: 'Апелляция принята!',
                })
                dispatch(openExpertTheoreticalPartOpen(false))
                navigate(ROUTES.ATTESTED_APPEAL)
            } else {
                message.error('Вы не оставили рекомендацию')
            }
        })
    }

    const handleClose = () => {
        AppealReject({ id: id }).then((res) => {
            if (res.data) {
                Modal.info({
                    title: 'Отклонено',
                    content: 'Апелляция отклонена!',
                })
                dispatch(openExpertTheoreticalPartOpen(false))
                navigate(ROUTES.ATTESTED_APPEAL)
            } else {
                message.error('Вы не оставили рекомендацию')
            }
        })
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
        <>
            <Modal
                title="Заключение"
                visible={expertTheoreticalPartModalOpen}
                onOk={handleClose}
                onCancel={() => dispatch(openExpertTheoreticalPartOpen(false))}
                footer={[
                    <Button key="appeal" size="medium" type="primary" onClick={onFinishSubmit}>
                        Принять апелляцию
                    </Button>,
                    <Button key="back" size="medium" danger onClick={handleClose}>
                        Отклонить
                    </Button>,
                ]}
            >
                <div style={{ display: 'flex', marginTop: 10 }}>
                    <Title level={5}>Аттестуемый {surveyquest?.user}</Title>
                </div>
                <div style={{ display: 'flex', marginTop: 10 }}>
                    <Title level={5}>
                        Квалификация:
                        <span style={{ marginLeft: 10 }}>{surveyquest?.direction}</span>
                    </Title>
                </div>
                <div style={{ display: 'flex', marginTop: 10 }}>
                    <Title level={5}>
                        Тест был начат:
                        <span style={{ marginLeft: 10 }}>
                            {' '}
                            {moment(surveyquest?.exam_date_start).format('DD.MM.YYYY HH:mm:ss')}
                        </span>
                    </Title>
                </div>
                <div style={{ display: 'flex', marginTop: 10 }}>
                    <Title level={5}>
                        Итоговые баллы:
                        <span
                            style={{
                                marginLeft: 10,
                                color:
                                    surveyquest?.tester_percent_score <
                                    surveyquest?.passing_percent_score
                                        ? 'red'
                                        : '#219653',
                            }}
                        >
                            {surveyquest?.first_part_score}/{surveyquest?.max_score} (
                            {surveyquest?.tester_percent_score})%
                        </span>
                    </Title>
                </div>
                <div style={{ display: 'flex', marginTop: 10 }}>
                    <Title level={5}>
                        Сообщение аттестуемого:
                        <span style={{ marginLeft: 10 }}>{appeal_text}</span>
                    </Title>
                </div>
                {info.map((item, index) => (
                    <div style={{ margin: '12px 0 16px 0' }} key={index}>
                        <Text
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
                        </Text>
                        <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                            <Text
                                style={{
                                    width: '120px',
                                    fontFamily: 'Roboto',
                                    fontWeight: '500',
                                    fontSize: '16px',
                                    lineHeight: '24px',
                                    marginTop: '8px',
                                }}
                            >
                                {item.recomendation.name}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'Roboto',
                                    fontWeight: '500',
                                    fontSize: '16px',
                                    lineHeight: '24px',
                                    marginTop: '8px',
                                }}
                            >
                                {item.recomendation.label}
                            </Text>
                        </div>
                    </div>
                ))}
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
                        surveyquest?.moderator_review.map((item, index) => (
                            <ModeratorReviewCard
                                key={index}
                                moderator_name={item.user_id}
                                recommendation={item.conclusion}
                                estimate={item.estimate}
                            />
                        ))}
                </div>
                <div style={{ margin: '12px 0 16px 0' }}>
                    <Text
                        style={{
                            marginBottom: '16px',
                            fontFamily: 'Roboto',
                            fontWeight: '400',
                            fontStyle: 'italic',
                            fontSize: '18px',
                            lineHeight: '27px',
                        }}
                    >
                        Ваше заключение аттестации
                    </Text>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                        <Text
                            style={{
                                width: '120px',
                                fontFamily: 'Roboto',
                                fontWeight: '500',
                                fontSize: '16px',
                                lineHeight: '24px',
                                marginTop: '8px',
                            }}
                        >
                            Аттестация:
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'Roboto',
                                fontWeight: '500',
                                fontSize: '16px',
                                lineHeight: '24px',
                                marginTop: '8px',
                            }}
                        >
                            {statusChoices[surveyquest?.estimate]}
                        </Text>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '8px' }}>
                        <Text
                            style={{
                                width: '120px',
                                fontFamily: 'Roboto',
                                fontWeight: '500',
                                fontSize: '16px',
                                lineHeight: '24px',
                                marginTop: '8px',
                            }}
                        >
                            Рекомендация:
                        </Text>
                        <Text
                            style={{
                                fontFamily: 'Roboto',
                                fontWeight: '500',
                                fontSize: '16px',
                                lineHeight: '24px',
                                marginTop: '8px',
                            }}
                        >
                            {surveyquest?.main_moderator_review}
                        </Text>
                    </div>
                </div>
            </Modal>
        </>
    )
}

AppealModeratorModal.propTypes = {
    surveyquest: PropTypes.array,
    id: PropTypes.number,
    appeal_text: PropTypes.string,
}

export default AppealModeratorModal
