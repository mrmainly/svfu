import { Typography, Space, Input, InputNumber } from 'antd'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { Line } from '../../components'

import ActionButton from './compoentns/action-button'

const { Text, Title } = Typography

const SoftTestExMo = ({ surveyquest }) => {
    const { arrayIndex } = useSelector((state) => state.survey_slice)

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
                            <Title level={4}>Описание</Title>
                            <Text style={{ marginTop: 12 }}>{item.question.description}</Text>
                            <Title level={4}>Задание</Title>
                            <Text style={{ marginTop: 12 }}>{item.question.description}</Text>
                            <Text style={{ marginTop: 20, fontWeight: 'bold' }}>
                                Варианты ответа:
                            </Text>
                            <div style={{ marginTop: 10 }}>
                                {item.question.technique === 'ONE_CHOICE' ? (
                                    <Space direction="vertical">
                                        {item.question.variant.map((item, index) => (
                                            <Text key={index}>
                                                {item.name}
                                                <span style={{ marginLeft: 3, fontWeight: 'bold' }}>
                                                    {item.is_true === true && '(правильный)'}
                                                </span>
                                            </Text>
                                        ))}
                                    </Space>
                                ) : (
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            marginTop: '-10px',
                                        }}
                                    >
                                        {item.question.variant.map((item, index) => (
                                            <Text
                                                style={{
                                                    marginTop: 10,
                                                    marginLeft: 1,
                                                }}
                                                key={index}
                                            >
                                                {item.name}
                                                <span style={{ marginLeft: 3, fontWeight: 'bold' }}>
                                                    {item.is_true === true && '(правильный)'}
                                                </span>
                                            </Text>
                                        ))}
                                    </div>
                                )}
                            </div>
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
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                    }}
                                >
                                    <Text>Ответ аттестуемого:</Text>
                                    {surveyquest?.answers_first_part?.map((itemAnswer, index) => {
                                        if (itemAnswer.question_id === item.question.id)
                                            return (
                                                <Text className="answer-user-text" key={index}>
                                                    {itemAnswer.answer}
                                                </Text>
                                            )
                                    })}
                                </div>
                                <div
                                    style={{
                                        height: 1,
                                        background: '#E6E6E6',
                                        width: '100%',
                                        marginTop: 20,
                                        marginBottom: 20,
                                    }}
                                />
                                <Space style={{ marginTop: 10 }}>
                                    <Text>Балл:</Text>
                                    <InputNumber />
                                </Space>
                                <Space style={{ marginTop: 10 }}>
                                    <Text>Ревью:</Text>
                                    <Input.TextArea></Input.TextArea>
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
