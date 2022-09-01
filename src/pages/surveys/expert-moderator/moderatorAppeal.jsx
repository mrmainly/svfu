import React from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import { Typography, Button, Spin } from 'antd'
import moment from 'moment'

import { Line } from '../../../components'
import ROUTES from '../../../routes'
import { useGetAppealIdQuery } from '../../../services/ModeratorService'
import { uaStatus } from '../../../translation/StatusTranslation'
import ExpertReviewCard from './components/cards/expert_review_card'

const { Title, Text } = Typography

const ModeratorAppeal = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const state = location.state

    const { id } = state
    console.log('id', id)
    const { data: surveyquest, isLoading } = useGetAppealIdQuery(id)

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
                    <span style={{ marginLeft: 10 }}>{surveyquest?.result.appeal_text}</span>
                </Title>
            </div>
            <Line />
            <Typography style={{ fontStyle: 'italic', fontSize: '16px' }}>
                Заключение председателя экспертов по теоретической части
            </Typography>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    marginTop: '12px',
                }}
            >
                <Typography>Дата проверки:</Typography>
                <Typography.Text strong>?????????</Typography.Text>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginTop: '8px' }}>
                <Typography>Рекомендация:</Typography>
                <Typography.Text strong>
                    {surveyquest?.result.main_expert_review_first_part}
                </Typography.Text>
            </div>
            <Line />
            <Typography style={{ fontStyle: 'italic', fontSize: '16px' }}>
                Заключение председателя экспертов по практической части
            </Typography>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    marginTop: '12px',
                }}
            >
                <Typography>Дата проверки:</Typography>
                <Typography.Text strong>????????????????????</Typography.Text>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginTop: '8px' }}>
                <Typography>Рекомендация:</Typography>
                <Typography.Text strong>
                    {surveyquest?.result.main_expert_review_second_part}
                </Typography.Text>
            </div>
            <Line />
            <div style={{ marginTop: '8px' }}>
                <Typography style={{ fontStyle: 'italic', fontSize: '16px' }}>
                    Решения модераторов
                </Typography>
                {surveyquest?.result?.moderator_review?.length &&
                    surveyquest?.moderator_review.map((item, index) => (
                        <ExpertReviewCard
                            key={index}
                            expert_name={item.user}
                            recommendation={item.conclusion_second_part}
                        />
                    ))}
            </div>
            <Line />
            <Typography style={{ fontStyle: 'italic', fontSize: '16px' }}>
                Ваше заключение аттестации
            </Typography>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    marginTop: '12px',
                }}
            >
                <Typography>Аттестация:</Typography>
                <Typography.Text strong>{uaStatus(surveyquest?.result_estimate)}</Typography.Text>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginTop: '8px' }}>
                <Typography>Рекомендация:</Typography>
                <Typography.Text strong>
                    {surveyquest?.result.main_moderator_review}
                </Typography.Text>
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
