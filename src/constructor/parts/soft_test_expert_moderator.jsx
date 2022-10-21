/* eslint-disable no-unused-vars */
import { Typography, Space, Input, InputNumber, Table, Form, Image } from 'antd'
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
            fixed: 'right',
            render: (is_true) => (is_true === true ? 'Да' : 'Нет'),
        },
        {
            title: 'Ответ аттестуемого',
            dataIndex: 'answer',
            key: 'answer',
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
    const pointColumns = [
        {
            title: 'Критерий оценки',
            dataIndex: 'condition',
            key: 'condition',
        },
        {
            title: 'Балл',
            dataIndex: 'point',
            key: 'point',
        },
    ]
    const data = [
        {
            condition:
                'Описание конкретной ситуации. Подробное конкретное описание проведенной работы, включая свои действия и слова. Действия и слова носят мотивирующий характер, побуждающий к действиям и вере в достижение результата. ',
            point: 3,
        },
        {
            condition:
                'Общее описание ситуации. Описание проведенной работы, включая свои действия и слова. Действия и слова носят мотивирующий характер, побуждающий к действиям и вере в достижение результата.',
            point: 2,
        },
        {
            condition:
                'Общее описание  ситуации. Схематичное описание проведенной работы, включая свои действия и слова. Действия и слова не носят мотивирующий характер, побуждающий к действиям и вере в достижение результата.',
            point: 1,
        },
        {
            condition:
                'Общее описание  ситуации. Схематичное описание проведенной работы, без описания конкретных дейсвий и слов. ',
            point: 0,
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
                            <Image />
                            <Text style={{ marginTop: 12 }}>{item.question.description}</Text>

                            <Table
                                columns={columns}
                                dataSource={item.question.variant}
                                pagination={false}
                            />

                            <Table
                                columns={pointColumns}
                                pagination={false}
                                dataSource={data}
                                title={() => (
                                    <Text style={{ fontWeight: 'bold' }}>Шкала оценки</Text>
                                )}
                            />

                            <div
                                style={{
                                    height: 1,
                                    background: '#E6E6E6',
                                    width: '100%',
                                    marginTop: 20,
                                    marginBottom: 20,
                                }}
                            />

                            <Form>
                                <Form.Item label="Оценка" name="point">
                                    <InputNumber size="small" min={0} />
                                </Form.Item>
                                <Form.Item label="Ревью" name="review">
                                    <Input.TextArea />
                                </Form.Item>
                            </Form>

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
