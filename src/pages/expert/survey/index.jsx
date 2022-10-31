import React from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import { Typography, Button, Spin } from 'antd'
import moment from 'moment'

import { Line } from '../../../components'
import ROUTES from '../../../routes'
import { useGetSurveyExpertIdQuery } from '../../../services/expert/Surveys'
import ExpertReviewCard from './components/cards/expert_review_card'
import ExpertSoftReviewCard from './components/cards/expert_soft_review_card'

import './expert.css'

const { Title } = Typography

const ExpertSurvey = () => {
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
    console.log(surveyquest)
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', marginTop: 10 }}>
                <Title level={5}>Название тестирования: {surveyquest.direction}</Title>
            </div>
            <div style={{ display: 'flex', marginTop: 10 }}>
                <Title level={5}>Аттестуемый: {surveyquest.user}</Title>
            </div>
            <div style={{ display: 'flex', marginTop: 10 }}>
                <Title level={5}>Тип теста: {surveyquest.survey.unit_type}</Title>
            </div>
            <div style={{ display: 'flex', marginTop: 10 }}>
                <Title level={5}>
                    Тест был начат:
                    <span style={{ marginLeft: 10 }}>
                        {moment(surveyquest.created).format('DD-MM-YYYY HH:mm:ss')}
                    </span>
                </Title>
            </div>
            {surveyquest.survey.unit_type === 'HARD' && (
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
            )}

            {surveyquest.main_expert && (
                <>
                    <Line />
                    <div>
                        <Title level={5} style={{ marginBottom: 20 }}>
                            Заключения по тестам
                        </Title>
                        {surveyquest.expert_review.length &&
                            surveyquest.expert_review.map((item, index) =>
                                surveyquest?.survey?.unit_type === 'SOFT' ? (
                                    <ExpertSoftReviewCard
                                        key={index}
                                        expert_name={item.user}
                                        recommendationPartOne={item.conclusion_first_part}
                                        recommendationPartTwo={item.conclusion_second_part}
                                        id={item.user_id}
                                    />
                                ) : (
                                    <ExpertReviewCard
                                        key={index}
                                        expert_name={item.user}
                                        recommendationPartOne={item.conclusion_first_part}
                                        recommendationPartTwo={item.conclusion_second_part}
                                        id={item.user_id}
                                    />
                                )
                            )}
                    </div>
                </>
            )}
            <Line />
            <Button
                type="primary"
                style={{ width: 'max-content' }}
                onClick={() => {
                    surveyquest.survey.unit_type === 'HARD'
                        ? navigate(ROUTES.SURVEY_PARTS_EXPERT, {
                              state: {
                                  surveyquest: surveyquest,
                                  id: id,
                              },
                          })
                        : navigate(ROUTES.SURVEY_PARTS_EXPERT_SOFT, {
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

export default ExpertSurvey
