import React from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import { Typography, Button, Spin } from 'antd'
import moment from 'moment'

import { Line } from '../../../components'
import ROUTES from '../../../routes'
import { useGetSurveyExpertIdQuery } from '../../../services/ExpertService'
import ExpertReviewCard from './components/cards/expert_review_card'

const { Title } = Typography

const Expert = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const state = location.state

    const { id } = state

    const { data: surveyquest, isLoading } = useGetSurveyExpertIdQuery(id)

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

    console.log('survey', surveyquest)

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', marginTop: 10 }}>
                <Title level={5}>Аттестуемый {surveyquest.user}</Title>
            </div>
            <div style={{ display: 'flex', marginTop: 10 }}>
                <Title level={5}>
                    Тест был начат:
                    <span style={{ marginLeft: 10 }}>
                        {' '}
                        {moment(surveyquest.exam_date_start).format('DD-MM-YYYY HH:mm:ss')}
                    </span>
                </Title>
            </div>
            <div style={{ display: 'flex', marginTop: 10 }}>
                <Title
                    level={5}
                    style={{
                        color:
                            surveyquest.tester_percent_score < surveyquest.passing_percent_score
                                ? 'red'
                                : '#219653',
                    }}
                >
                    Итоговые баллы: {surveyquest.first_part_score}/{surveyquest.max_score}
                    <span style={{ marginLeft: 10 }}>{surveyquest.tester_percent_score}%</span>
                </Title>
            </div>

            {surveyquest.main_expert && (
                <>
                    <Line />
                    <div>
                        <Title level={5} style={{ marginBottom: 20 }}>
                            Заключения по теоретической части
                        </Title>
                        {surveyquest.expert_review.length &&
                            surveyquest.expert_review.map((item, index) => (
                                <ExpertReviewCard
                                    key={index}
                                    expert_name={item.user}
                                    recommendation={item.conclusion_first_part}
                                    id={item.id}
                                />
                            ))}
                    </div>
                    <div style={{ marginTop: 20 }}>
                        <Title level={5} style={{ marginBottom: 20 }}>
                            Заключения по практической части
                        </Title>
                        {surveyquest.expert_review.length &&
                            surveyquest.expert_review.map((item, index) => (
                                <ExpertReviewCard
                                    key={index}
                                    expert_name={item.user}
                                    recommendation={item.conclusion_second_part}
                                    id={item.id}
                                />
                            ))}
                    </div>
                </>
            )}
            <Line />
            <Button
                type="primary"
                style={{ width: 'max-content' }}
                onClick={() => {
                    navigate(ROUTES.SURVEYS_PART, {
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

export default Expert
