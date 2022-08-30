import React from 'react'

import { useLocation, useNavigate } from 'react-router-dom'
import { Typography, Button } from 'antd'

import { Line } from '../../../components'
import ROUTES from '../../../routes'

const { Title, Text } = Typography

const Expert = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const state = location.state

    const { surveyquest, id } = state

    console.log(surveyquest)

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', marginTop: 10 }}>
                <Title level={5}>Аттестуемый {surveyquest.user}</Title>
            </div>
            <div style={{ display: 'flex', marginTop: 10 }}>
                <Title level={5}>
                    Тест был начат:<span> {surveyquest.exam_date_start}</span>
                </Title>
            </div>
            <div style={{ display: 'flex', marginTop: 10 }}>
                <Title level={5}>Итоговые баллы: {surveyquest.first_part_score}</Title>
            </div>
            <Line />
            <Button
                type="primary"
                style={{ width: 'max-content' }}
                onClick={() => {
                    navigate(ROUTES.THEORETICAL_PART_EXPERT, {
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
