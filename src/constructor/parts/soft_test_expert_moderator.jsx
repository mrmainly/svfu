/* eslint-disable no-unused-vars */
import { Typography, Space, Input, InputNumber, Table } from 'antd'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { Line } from '../../components'

import ActionButton from './compoentns/action-button'

const { Text, Title } = Typography

const SoftTestExMo = ({ surveyquest }) => {
    console.log('survey', surveyquest)
    const { arrayIndex } = useSelector((state) => state.survey_slice)
    const columns = [
        {
            title: 'Вариант ответа',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Правильный вариант',
            dataIndex: 'is_true',
            key: 'is_true',
            width: 10,
            fixed: 'right',
            render: (is_true) => (is_true === true ? 'Да' : 'Нет'),
        },
        {
            title: 'Ответ аттестуемого',
            dataIndex: 'answer',
            key: 'answer',
            width: 10,
            fixed: 'right',
            render: (name, record) => {
                const answer = surveyquest?.answers_first_part?.map((itemAnswer) => {
                    if (itemAnswer.answer_id === record.id) {
                        return true
                    }
                })
                if (!answer) {
                    return '-'
                } else {
                    return <Text>Ответил</Text>
                }
            },
        },
    ]

    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {surveyquest?.survey?.surveyquest?.length &&
                    surveyquest?.survey?.surveyquest.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                display: index === arrayIndex ? 'flex' : 'none',
                                flexDirection: 'column',
                            }}
                        >
                            <Title level={4}>Вопрос №{arrayIndex + 1}</Title>
                            <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Описание</Text>
                            <Text style={{ marginTop: 12 }}>{item.question.description}</Text>
                            <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Задание</Text>
                            <Text style={{ marginTop: 12 }}>{item.question.description}</Text>

                            <Table columns={columns} dataSource={item.question.variant} />

                            <div
                                style={{
                                    height: 1,
                                    background: '#E6E6E6',
                                    width: '100%',
                                    marginTop: 20,
                                    marginBottom: 20,
                                }}
                            />
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <Space
                                    style={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <Text>Балл:</Text>
                                    <InputNumber size="small" min={0} />
                                </Space>
                                <Space
                                    style={{
                                        marginTop: 10,
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                    }}
                                >
                                    <Text>Ревью:</Text>
                                    <Input.TextArea />
                                </Space>
                            </div>

                            <Line />
                            <ActionButton
                                arrayIndex={arrayIndex}
                                surveyquest_length={surveyquest?.survey?.surveyquest?.length}
                            />
                        </div>
                    ))}
            </div>
        </div>
    )
}

SoftTestExMo.propTypes = {
    surveyquest: PropTypes.object,
}

export default SoftTestExMo
