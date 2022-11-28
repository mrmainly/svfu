import { Typography, Space, Table } from 'antd'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { Line } from '../../components'

import ActionButton from './compoentns/action-button'

const { Text, Title } = Typography

const TheoreticalPartExMo = ({ surveyquest }) => {
    const { arrayIndex } = useSelector((state) => state.survey_slice)

    const sum = (question_id, array) => {
        const newArray = array
            ?.map((itemAnswer) => {
                if (itemAnswer.question_id === question_id) return itemAnswer.score
            })
            .filter((element) => element != undefined)
            .reduce((prev, curr) => prev + curr, 0)
        return newArray
    }
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
                let answer
                surveyquest?.answers_first_part?.map((itemAnswer) => {
                    if (record.id === itemAnswer.answer_id) {
                        answer = true
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
                            <Text style={{ marginTop: 12 }}>{item.question.description}</Text>

                            <Table
                                style={{ marginTop: 20 }}
                                columns={columns}
                                dataSource={item?.question?.variant}
                                pagination={false}
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
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Space style={{ marginTop: 10 }}>
                                    <Text>Балл:</Text>
                                    {sum(item.question.id, surveyquest.answers_first_part)}
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

TheoreticalPartExMo.propTypes = {
    surveyquest: PropTypes.object,
}

export default TheoreticalPartExMo
