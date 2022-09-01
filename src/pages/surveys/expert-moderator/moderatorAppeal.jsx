import React from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import { Typography, Button, Spin } from 'antd'
import moment from 'moment'

import { Line } from '../../../components'
import ROUTES from '../../../routes'
import { useGetAppealIdQuery } from '../../../services/ModeratorService'
import ModeratorReviewCard from './components/cards/moderator_review_card'
import { udEstimate } from '../../../translation/EstimateTransation'
const { Title, Text } = Typography

const ModeratorAppeal = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const state = location.state

    const { id } = state
    const { data: surveyquest, isLoading } = useGetAppealIdQuery({ id: id })
    const info = [
        {
            title: 'Заключение по теоретической части',
            recomendation: {
                name: 'Рекомендация:',
                label: surveyquest?.result.main_expert_review_first_part,
            },
        },
        {
            title: 'Заключение практической части',
            recomendation: {
                name: 'Рекомендация:',
                label: surveyquest?.result.main_expert_review_second_part,
            },
        },
    ]
    if (isLoading) {
        return (
            <div
                style={{
                    height: 190,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Spin />
            </div>
        )
    }

    console.log('surveyquest', surveyquest)
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', marginTop: 10 }}>
                <Title level={5}>Аттестуемый {surveyquest?.result.user}</Title>
            </div>
            <div style={{ display: 'flex', marginTop: 10 }}>
                <Title level={5}>
                    Квалификация:
                    <span style={{ marginLeft: 10 }}>{surveyquest?.survey_name}</span>
                </Title>
            </div>
            <div style={{ display: 'flex', marginTop: 10 }}>
                <Title level={5}>
                    Тест был начат:
                    <span style={{ marginLeft: 10 }}>
                        {' '}
                        {moment(surveyquest?.result.exam_date_start).format('DD.MM.YYYY HH:mm:ss')}
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
                                surveyquest?.result.tester_percent_score <
                                surveyquest?.result.passing_percent_score
                                    ? 'red'
                                    : '#219653',
                        }}
                    >
                        {surveyquest?.result.first_part_score}/{surveyquest?.result.max_score} (
                        {surveyquest?.result.tester_percent_score})%
                    </span>
                </Title>
            </div>
            <div style={{ display: 'flex', marginTop: 10 }}>
                <Title level={5}>
                    Сообщение аттестуемого:
                    <span style={{ marginLeft: 10 }}>{surveyquest?.appeal_text}</span>
                </Title>
            </div>

            <Line />
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
                {surveyquest?.result?.moderator_review?.length &&
                    surveyquest?.result.moderator_review.map((item, index) => (
                        <ModeratorReviewCard
                            key={index}
                            moderator_name={item.user_id}
                            recommendation={item.conclusion}
                            estimate={item.estimate}
                        />
                    ))}
            </div>
            <Line />
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
                        {udEstimate(surveyquest?.result.estimate)}
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
                        {surveyquest?.result.main_moderator_review}
                    </Text>
                </div>
            </div>

            <Line />
            <Button
                type="primary"
                style={{ width: 'max-content' }}
                onClick={() => {
                    navigate(ROUTES.SURVEYS_PART, {
                        state: {
                            surveyquest: surveyquest?.result,
                            id: id,
                            appeal: true,
                        },
                    })
                }}
            >
                Начать экспертизу
            </Button>
        </div>
    )
}

export default ModeratorAppeal
