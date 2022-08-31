import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Modal, Spin, Space, Typography, message } from 'antd'
import moment from 'moment'

import { useGetSurveysIdQuery, useSurveyPatchMutation } from '../../../../services/SurveysService'
import { Line, MyButton } from '../../../../components'
import ROUTES from '../../../../routes'

const { Text } = Typography

const TestDetail = ({ open, setOpen, ID }) => {
    const { data } = useGetSurveysIdQuery({ id: ID })
    const [surveyPatch] = useSurveyPatchMutation()
    const navigate = useNavigate()

    const items = [
        {
            label: 'Квалификация',
            value: data?.name,
        },
        {
            label: 'Начало доступа:',
            value: moment(data?.exam_date_start).format('DD.MM.YYYY, hh:mm'),
        },
        {
            label: 'Конец доступа:',
            value: moment(data?.exam_date_finish).format('DD.MM.YYYY, hh:mm'),
        },
        {
            label: 'Время на выполнение:',
            value: `${data?.time_exam} мин`,
        },
    ]

    const pathcSurvey = () => {
        surveyPatch({ id: data.id }).then((res) => {
            if (res.data) {
                navigate(ROUTES.TESTER_SURVEY_PART, {
                    state: { surveyquest: data.surveyquest, id: data.id },
                })
            } else {
                message.error('Вы уже прошли тестирование')
            }
        })
    }

    return (
        <div>
            <Modal
                destroyOnClose={true}
                title="Создание вопроса"
                visible={open}
                onOk={() => {
                    setOpen(false)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
                footer={[
                    <MyButton onClick={pathcSurvey} key="start">
                        Начать тестирование
                    </MyButton>,
                    <MyButton
                        key="back"
                        type="default"
                        style={{ background: '#FFF' }}
                        onClick={() => setOpen(false)}
                    >
                        Отмена
                    </MyButton>,
                ]}
            >
                {items.map((item, index) => (
                    <Space size="large" key={index} style={{ marginTop: index === 0 ? 0 : 15 }}>
                        <div style={{ width: 150, fontWeight: 600 }}>{item.label}</div>
                        <Text>{item.value}</Text>
                    </Space>
                ))}
            </Modal>
        </div>
    )
}

export default TestDetail
