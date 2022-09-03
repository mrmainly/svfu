import React, { useState } from 'react'
import moment from 'moment'
import { useParams, useNavigate } from 'react-router-dom'
import { Spin, Space, Typography, Button } from 'antd'
import { BsArrowLeft } from 'react-icons/bs'

import { useGetTestResultsIDQuery } from '../../../src/services/SurveysService'
import { Line } from '../../components'
import AppealModal from './components/modal/AppealModal'
import CancelModal from './components/modal/CancelModal'
import ROUTES from '../../routes'

const { Text } = Typography

const TestResult = () => {
    const params = useParams()
    const [appealModal, setAppealModal] = useState(false)
    const [cancelModal, setCancelModal] = useState(false)
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
            value: moment(dataResult?.survey?.start_survey).format('DD.MM.YYYY, HH:mm'),
        },
        {
            label: 'Тест проверен:',
            value: moment(dataResult?.finish_date).format('DD.MM.YYYY, HH:mm'),
        },
        {
            label: 'Итоговые балыы:',
            value: `${dataResult?.first_part_score}/${dataResult?.max_score} (${dataResult?.tester_percent_score}%)`,
            color: '#219653',
        },
        {
            label: 'Протокол о результатах тестирования:',
            value: TEST_RESULT ? (
                <a href={TEST_RESULT?.file} target="_blank">
                    document.pdf
                </a>
            ) : (
                'Протокол составляется'
            ),
        },
        {
            label: 'Протокол о результатах аттестации:',
            value: CERTIFICATION_RESULT ? (
                <a href={CERTIFICATION_RESULT?.file} target="_blank">
                    document.pdf
                </a>
            ) : (
                'Протокол составляется'
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
            <div style={{ display: 'flex', marginBottom: '16px', justifyContent: 'space-between' }}>
                <Text style={{ fontStyle: 'italic', fontSize: '18px', marginBottom: '16px' }}>
                    Итоги аттестации
                </Text>

                {dataResult?.appeal[dataResult?.appeal?.length - 1]?.status === 'WAITING' ? (
                    <Button type="primary" danger onClick={() => setCancelModal(true)}>
                        Отменить аппеляцию
                    </Button>
                ) : (
                    <Button type="primary" danger ghost onClick={() => setAppealModal(true)}>
                        Подать аппеляцию
                    </Button>
                )}
            </div>
            <AppealModal open={appealModal} setOpen={setAppealModal} ID={dataResult?.id} />
            <CancelModal open={cancelModal} setOpen={setCancelModal} ID={dataResult?.id} />
            {items.map((item, index) => (
                <Space size="large" key={index} style={{ marginTop: index === 0 ? 0 : 15 }}>
                    <div style={{ fontWeight: 600 }}>{item.label}</div>
                    <Text style={{ color: item.color }}>{item.value}</Text>
                </Space>
            ))}
            <Line />
            <Text style={{ fontStyle: 'italic', fontSize: '18px', marginBottom: '16px' }}>
                Заключение председателя экспертов
            </Text>
            <Space size="large">
                <div style={{ width: 150, fontWeight: 600 }}>Рекомендация:</div>
                <div>
                    <Typography.Paragraph>
                        {dataResult?.main_expert_review_first_part}
                    </Typography.Paragraph>
                    <Typography.Paragraph>
                        {dataResult?.main_expert_review_second_part}
                    </Typography.Paragraph>
                </div>
            </Space>
            <Line />
            <Text style={{ fontStyle: 'italic', fontSize: '18px', marginBottom: '16px' }}>
                Заключение председателя модераторов
            </Text>
            <Space size="large">
                <div style={{ width: 150, fontWeight: 600 }}>Рекомендация:</div>
                <Text>{dataResult?.main_moderator_review}</Text>
            </Space>
        </div>
    )
}

export default TestResult
