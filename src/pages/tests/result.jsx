import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Modal, Spin, Space, Typography, message } from 'antd'
// import moment from 'moment'
import { BsArrowLeft } from 'react-icons/bs'

// import { useGetSurveysIdQuery, useSurveyPatchMutation } from '../../../../services/SurveysService'
import { Line, MyButton } from '../../components'
import ROUTES from '../../routes'

const { Text } = Typography

const TestResult = () => {
    // const { data, isFetching } = useGetSurveysIdQuery({ id: ID })
    // const [surveyPatch] = useSurveyPatchMutation()
    const navigate = useNavigate()
    // if (isFetching) {
    //     return (
    //         <div
    //             style={{
    //                 height: 210,
    //                 display: 'flex',
    //                 justifyContent: 'center',
    //                 paddingTop: 100,
    //             }}
    //         >
    //             <Spin />
    //         </div>
    //     )
    // }

    const items = [
        {
            label: 'Квалификация',
            value: 'квалификация ыыыыыыыы',
        },
        {
            label: 'Тест был начат:',
            value: 'sdsa',
            // value: moment(data?.exam_date_start).format('DD.MM.YYYY, hh:mm'),
        },
        {
            label: 'Тест проверен:',
            value: 'sfdgdghfdh',
            // value: moment(data?.exam_date_finish).format('DD.MM.YYYY, hh:mm'),
        },
        {
            label: 'Итоговые балыы:',
            value: 'dafhgfh',
            // value: `${data?.time_exam} мин`,
        },
        {
            label: 'Протокол о результатах тестирования:',
            value: 'dafhgfh',
            // value: `${data?.time_exam} мин`,
        },
        {
            label: 'Протокол о результатах аттестации:',
            value: 'dafhgfh',
            // value: `${data?.time_exam} мин`,
        },
    ]

    // const pathcSurvey = () => {
    //     surveyPatch({ id: data.id }).then((res) => {
    //         if (res.data) {
    //             navigate(ROUTES.THEORETICAL_PART, {
    //                 state: { surveyquest: data.surveyquest, id: data.id },
    //             })
    //         } else {
    //             message.error('Вы уже прошли тестирование')
    //         }
    //     })
    // }

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
                    <Text>{item.value}</Text>
                </Space>
            ))}
            <Line />
            <Text style={{ fontStyle: 'italic', fontSize: '18px', marginBottom: '16px' }}>
                Заключение теоретической части
            </Text>
            <Space size="large">
                <div style={{ width: 150, fontWeight: 600 }}>Рекомендация:</div>
                <Text>
                    Рассмотрев теоретическую часть, пришел к выводу, что вы - гений, так держать
                </Text>
            </Space>
            <Line />
            <Text style={{ fontStyle: 'italic', fontSize: '18px', marginBottom: '16px' }}>
                Заключение практической части
            </Text>
            <Space size="large">
                <div style={{ width: 150, fontWeight: 600 }}>Рекомендация:</div>
                <Text>
                    Рассмотрев ответ на практическую часть, пришел к выводу, что вы - гений, так
                    держать
                </Text>
            </Space>
        </div>
    )
}

export default TestResult
