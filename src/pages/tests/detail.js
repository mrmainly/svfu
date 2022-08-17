import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Spin, Space, Typography } from 'antd'

import { useGetSurveysIdQuery, useSurveyPatchMutation } from '../../services/SurveysService'
import { Line, MyButton } from '../../components'
import ROUTES from '../../routes'

const { Text } = Typography

const TestDetail = () => {
    const params = useParams()

    const { data, isFetching, error } = useGetSurveysIdQuery({ id: params.id })
    const [surveyPatch] = useSurveyPatchMutation()
    const navigate = useNavigate()

    if (isFetching) {
        return (
            <div
                style={{
                    height: 210,
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: 100,
                }}
            >
                <Spin />
            </div>
        )
    }

    const items = [
        {
            label: 'Квалификация',
            value: data.name,
        },
        {
            label: 'Начало доступа:',
            value: data.exam_date_start,
        },
        {
            label: 'Конец доступа:',
            value: data.exam_date_finish,
        },
        {
            label: 'Время на выполнение:',
            value: `${data.time_exam} мин`,
        },
    ]

    const pathcSurvey = () => {
        surveyPatch({ id: data.id }).then((res) => {
            if (res.data) {
                navigate(ROUTES.THEORETICAL_PART, {
                    state: { surveyquest: data.surveyquest, id: data.id },
                })
            } else {
                console.log('error')
            }
        })
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {items.map((item, index) => (
                <Space size="large" key={index} style={{ marginTop: index === 0 ? 0 : 15 }}>
                    <div style={{ width: 150, fontWeight: 600 }}>{item.label}</div>
                    <Text>{item.value}</Text>
                </Space>
            ))}
            <Line />
            <MyButton onClick={pathcSurvey}>Начать тестирование</MyButton>
            {/* <MyButton
                onClick={() => {
                    navigate(ROUTES.SURVEYS, {
                        state: { surveyquest: data.surveyquest, id: data.id },
                    });
                }}
            >
                Начать тестирование
            </MyButton> */}
        </div>
    )
}

export default TestDetail
