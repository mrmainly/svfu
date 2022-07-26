/* eslint-disable no-undef */

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Modal, Space, Typography, message } from 'antd'
import moment from 'moment'
import PropTypes from 'prop-types'

import {
    useGetSurveyIdQuery,
    usePatchSurveyMutation,
} from '../../../../../services/tester/Surveys'
import { MyButton } from '../../../../../components'
import ROUTES from '../../../../../routes'

const { Text } = Typography

const TestDetail = ({ open, handleClose, ID }) => {
    const { data } = useGetSurveyIdQuery({ id: ID })
    console.log('surveydata', data)
    const [surveyPatch] = usePatchSurveyMutation()
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

    const patchSurvey = () => {
        surveyPatch({ id: data.id }).then((res) => {
            if (res.data) {
                navigate(ROUTES.TESTER_SURVEY_PART, {
                    state: {
                        id: data.id,
                        unit_type: data.unit_type,
                    },
                })
                window.localStorage.setItem('survey-id',ID)
            } else {
                message.error('Вы уже прошли тестирование')
            }
        })
    }

    return (
        <div>
            <Modal
                destroyOnClose={true}
                title={data?.name}
                visible={open}
                onOk={handleClose}
                onCancel={handleClose}
                footer={[
                    <MyButton
                        onClick={() =>
                            data?.survey_status === 'IN_PROGRESS'
                                ? navigate(ROUTES.TESTER_SURVEY_PART, {
                                      state: {
                                          id: data.id,
                                          unit_type: data.unit_type,
                                      },
                                  },
                                    window.localStorage.setItem('survey-id',ID))
                                : patchSurvey()
                        }
                        key="start"
                    >
                        Начать тестирование
                    </MyButton>,
                    <MyButton
                        key="back"
                        type="default"
                        style={{ background: '#FFF', color: 'black' }}
                        onClick={handleClose}
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

TestDetail.propTypes = {
    open: PropTypes.bool,
    handleClose: PropTypes.func,
    ID: PropTypes.number,
}

export default TestDetail
