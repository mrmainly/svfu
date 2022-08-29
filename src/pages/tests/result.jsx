import React from 'react'
import moment from 'moment'
import { useParams, useNavigate } from 'react-router-dom'
import { Spin, Space, Typography } from 'antd'
import { BsArrowLeft } from 'react-icons/bs'

import { useGetTestResultsIDQuery } from '../../../src/services/SurveysService'
import { Line } from '../../components'
import ROUTES from '../../routes'

const { Text } = Typography

const TestResult = () => {
    const params = useParams()
    const { data: dataResult, isFetching } = useGetTestResultsIDQuery({ id: params.id })
    let TEST_RESULT = dataResult?.protocol?.find((item) => item.type === 'TEST_RESULT')
    let CERTIFICATION_RESULT = dataResult?.protocol?.find(
        (item) => item.type === 'CERTIFICATION_RESULT'
    )

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
            value: dataResult?.survey?.name,
        },
        {
            label: 'Тест был начат:',
            value: moment(dataResult?.survey?.exam?.date_start).format('DD.MM.YYYY, hh:mm'),
        },
        {
            label: 'Тест проверен:',
            value: moment(dataResult?.survey?.finish_survey).format('DD.MM.YYYY, hh:mm'),
        },
        {
            label: 'Итоговые балыы:',
            value: `${dataResult?.first_part_score}/${dataResult?.max_score} (${dataResult?.tester_percent_score}%)`,
            color: '#219653',
        },
        {
            label: 'Протокол о результатах тестирования:',
            value: (
                <a href={TEST_RESULT.file} target="_blank">
                    document.pdf
                </a>
            ),
        },
        {
            label: 'Протокол о результатах аттестации:',
            value: (
                <a href={CERTIFICATION_RESULT.file} target="_blank">
                    document.pdf
                </a>
            ),
        },
    ]

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    alignItems: 'center',
                }}
            >
                <BsArrowLeft
                    style={{ fontSize: 30, cursor: 'pointer', marginRight: '10px' }}
                    onClick={() => {
                        navigate(ROUTES.AVAILABLE_TESTS)
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
                    Название квалификации
                </span>
            </div>
            <Line />
            <Text style={{ fontStyle: 'italic', fontSize: '18px', marginBottom: '16px' }}>
                Итоги аттестации
            </Text>
            {items.map((item, index) => (
                <Space size="large" key={index} style={{ marginTop: index === 0 ? 0 : 15 }}>
                    <div style={{ width: 150, fontWeight: 600 }}>{item.label}</div>
                    <Text style={{ color: item.color }}>{item.value}</Text>
                </Space>
            ))}
            <Line />
            <Text style={{ fontStyle: 'italic', fontSize: '18px', marginBottom: '16px' }}>
                Заключение теоретической части
            </Text>
            <Space size="large">
                <div style={{ width: 150, fontWeight: 600 }}>Рекомендация:</div>
                <Text>{dataResult?.main_expert_review_first_part}</Text>
            </Space>
            <Line />
            <Text style={{ fontStyle: 'italic', fontSize: '18px', marginBottom: '16px' }}>
                Заключение практической части
            </Text>
            <Space size="large">
                <div style={{ width: 150, fontWeight: 600 }}>Рекомендация:</div>
                <Text>{dataResult?.main_expert_review_second_part}</Text>
            </Space>
        </div>
    )
}

export default TestResult
