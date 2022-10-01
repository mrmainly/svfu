import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

import { Typography, Button, Spin } from 'antd'

import moment from 'moment'

import { Line } from '../../../components'
import ModeratorReviewCard from './components/cards/moderator_review_card'
import ROUTES from '../../../routes'
import { useGetSurveyModeratorIdQuery } from '../../../services/moderator/Surveys'

const { Title, Text } = Typography

const ModeratorSurvey = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const state = location.state

    const { id } = state

    const { data: surveyquest, isLoading } = useGetSurveyModeratorIdQuery(id)
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

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    alignItems: 'center',
                    marginBottom: '10px',
                }}
            >
                <BsArrowLeft
                    style={{ fontSize: 30, cursor: 'pointer', marginRight: '10px' }}
                    onClick={() => {
                        navigate(-1)
                    }}
                />
                <span
                    style={{
                        fontFamily: 'Roboto',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: '20px',
                        lineHeight: '30px',
                    }}
                >
                    {surveyquest?.survey.name}
                </span>
            </div>
            <Line />
            <div style={{ display: 'flex', marginTop: 10 }}>
                <Title level={5}>Аттестуемый {surveyquest?.user}</Title>
            </div>
            <div style={{ display: 'flex', marginTop: 10 }}>
                <Title level={5}>
                    Тест был начат:
                    <span style={{ marginLeft: 10 }}>
                        {' '}
                        {moment(surveyquest?.exam_date_start).format('DD-MM-YYYY HH:mm:ss')}
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
                                surveyquest.passing_percent_score
                                    ? 'red'
                                    : '#219653',
                        }}
                    >
                        {surveyquest?.first_part_score}/{surveyquest?.max_score} (
                        {surveyquest?.tester_percent_score}%)
                    </span>
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
                            }}
                        >
                            {item.recomendation.label}
                        </Text>
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
            <Line />
            <Button
                type="primary"
                ghost
                style={{ width: 'max-content' }}
                onClick={() => {
                    navigate(ROUTES.USERS_DETAIL + `/${surveyquest?.id}`, {
                        state: {
                            type: 'moderator',
                        },
                    })
                }}
            >
                Профиль аттестуемого
            </Button>
            <Line />
            <Button
                type="primary"
                style={{ width: 'max-content' }}
                onClick={() => {
                    navigate(ROUTES.SURVEY_PARTS_MODERATOR, {
                        state: {
                            surveyquest: surveyquest,
                            id: id,
                        },
                    })
                }}
            >
                Начать экспертизу
            </Button>
        </div>
    )
}

export default ModeratorSurvey
