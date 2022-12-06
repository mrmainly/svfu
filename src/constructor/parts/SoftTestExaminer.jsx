/* eslint-disable no-unused-vars */
import { Typography, Space, Input, InputNumber, Table, Form, Image, Button } from 'antd'
import { SurveysSlice } from '../../reducers/SurveysSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'

import { Line } from '../../components'

import ActionButton from './components/ActionButton'
const { setSoftAnswerExpert } = SurveysSlice.actions

const { Text, Title } = Typography

const SoftTestExMo = ({ surveyquest }) => {
    const role = JSON.parse(localStorage.getItem('role'))
    const dispatch = useDispatch()

    const { arrayIndex } = useSelector((state) => state.survey_slice)
    const columns = [
        {
            title: 'Критерий',
            dataIndex: 'criterion',
            key: 'criterion',
        },
        {
            title: 'Балл',
            dataIndex: 'score',
            key: 'score',
        },
    ]
    const columns2 = [
        {
            title: 'Вопрос',
            dataIndex: 'name',
            key: 'name1',
        },
        {
            title: 'Варианты',
            dataIndex: 'variants',
            key: 'variants',
            render: (_, record) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {record.variants.map((item, index) => (
                            <div key={index}>
                                {item.name}
                                <div
                                    style={{
                                        height: 1,
                                        background: '#E6E6E6',
                                        width: '100%',
                                        marginTop: 3,
                                        marginBottom: 5,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )
            },
        },
        {
            title: 'Баллы',
            dataIndex: 'name2',
            key: 'name2',
            render: (_, record) => {
                return (
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {record.variants.map((item, index) => (
                            <div key={index}>
                                <span> {item.score} баллы</span>
                                <div
                                    style={{
                                        height: 1,
                                        background: '#E6E6E6',
                                        width: '100%',
                                        marginTop: 3,
                                        marginBottom: 5,
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )
            },
        },
    ]

    const onSubmit = (data) => {
        const abjArr = Object.entries(data)
        const soft_review = abjArr.map((item) => item?.pop())
        const main_score = soft_review
            .map((item) => {
                return item.score
            })
            .reduce((prev, curr) => prev + curr, 0)
        dispatch(setSoftAnswerExpert([soft_review, main_score]))
    }

    return (
        <div>
            <Form layout="vertical" onFinish={onSubmit} id="expert-soft-form">
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {surveyquest?.survey?.softquestions?.length &&
                        surveyquest?.survey?.softquestions?.map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    display: index === arrayIndex ? 'flex' : 'none',
                                    flexDirection: 'column',
                                }}
                            >
                                <Title level={4}>Вопрос №{arrayIndex + 1}</Title>
                                <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Описание</Text>
                                <Text style={{ marginTop: 12 }}>{item.description}</Text>
                                <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Задание</Text>
                                <Text style={{ marginTop: 12 }}>{item.name}</Text>
                                {item?.question_images?.length > 0 && (
                                    <div
                                        style={{
                                            display: 'flex',
                                            flexDirection: ' column',
                                            marginTop: 12,
                                        }}
                                    >
                                        {item?.question_images.map((itemImage, index) => (
                                            <Image
                                                key={index}
                                                width={100}
                                                src={`${itemImage.image}`}
                                            />
                                        ))}
                                    </div>
                                )}
                                {item?.question_files?.length > 0 && (
                                    <a
                                        href={item?.question_files[0].file}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{ marginTop: 12 }}
                                    >
                                        {decodeURI(item?.question_files[0].file).split('/')[5]}
                                    </a>
                                )}
                                {item?.variants?.length > 0 && (
                                    <div style={{ marginTop: 12 }}>
                                        <Text style={{ fontWeight: 'bold' }}>Варианты ответа:</Text>
                                        {item.variants.map((item, index) => (
                                            <div key={index}> - {item.name}</div>
                                        ))}
                                    </div>
                                )}

                                {item?.table_quest?.length > 0 && (
                                    <div style={{ marginTop: 20 }}>
                                        <Text style={{ fontWeight: 'bold' }}>TableQuest:</Text>
                                        <Table
                                            columns={columns2}
                                            dataSource={item.table_quest}
                                            pagination={false}
                                        />
                                    </div>
                                )}

                                {item?.table_quest?.length > 0 && (
                                    <div style={{ marginTop: 20 }}>
                                        <Text style={{ fontWeight: 'bold' }}>
                                            Ответы аттестуемого на TableQuest:
                                        </Text>

                                        {surveyquest?.answers_soft_part.map((itemAnswer) => {
                                            if (item.id == itemAnswer.q_id) {
                                                return itemAnswer.table_quest.map(
                                                    (itemTableQuest, index) => (
                                                        <div key={index}>
                                                            {itemTableQuest.name}:
                                                            {itemTableQuest.answers}
                                                        </div>
                                                    )
                                                )
                                            }
                                        })}
                                    </div>
                                )}
                                {item?.variants?.length > 0 && (
                                    <div style={{ marginTop: 20 }}>
                                        <Text style={{ fontWeight: 'bold' }}>
                                            Ответ аттестуемого на варианты ответа:{' '}
                                        </Text>
                                        {surveyquest?.answers_soft_part?.map(
                                            (itemAnswer, index) => {
                                                if (parseInt(itemAnswer.q_id) === item.id)
                                                    return (
                                                        <Text key={index}>{itemAnswer.q_a} </Text>
                                                    )
                                            }
                                        )}
                                    </div>
                                )}

                                {item?.is_describe && (
                                    <div
                                        style={{
                                            marginTop: 20,
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <Text style={{ fontWeight: 'bold' }}>
                                            Развернутый ответ аттестуемого:
                                        </Text>
                                        <Text>
                                            {
                                                surveyquest?.answers_soft_part?.find(
                                                    (itemAnswer) => itemAnswer.q_id == item.id
                                                ).q_d
                                            }
                                        </Text>
                                    </div>
                                )}
                                <div
                                    style={{
                                        height: 1,
                                        background: '#E6E6E6',
                                        width: '100%',
                                        marginTop: 20,
                                        marginBottom: 20,
                                    }}
                                />
                                {item?.hint?.length > 0 && (
                                    <div>
                                        <Text style={{ fontWeight: 'bold' }}>Шкала оценки:</Text>
                                        <Table
                                            columns={columns}
                                            dataSource={item.hint}
                                            style={{ marginTop: 12 }}
                                            pagination={false}
                                        ></Table>
                                    </div>
                                )}
                                {role === 'MODERATOR' &&
                                surveyquest?.status_result !== 'CHECKED_BY_MAIN_MODERATOR' ? (
                                    <div>
                                        <div style={{ marginTop: 20 }}>
                                            <Text style={{ fontWeight: 'bold' }}>
                                                Балл председателя экспертов:{' '}
                                            </Text>
                                            {surveyquest?.main_expert_review_soft_part?.map(
                                                (itemAnswer, index) => {
                                                    if (parseInt(itemAnswer.q_id) === item.id)
                                                        return (
                                                            <Text key={index}>
                                                                {itemAnswer.score}
                                                            </Text>
                                                        )
                                                }
                                            )}
                                        </div>
                                        <div>
                                            <Text style={{ fontWeight: 'bold' }}>
                                                Комментарий председателя экспертов:{' '}
                                            </Text>
                                            {surveyquest?.main_expert_review_soft_part?.map(
                                                (itemAnswer, index) => {
                                                    if (parseInt(itemAnswer.q_id) === item.id)
                                                        return (
                                                            <Text key={index}>
                                                                {itemAnswer.comment}
                                                            </Text>
                                                        )
                                                }
                                            )}
                                        </div>
                                    </div>
                                ) : role === 'EXPERT' ? (
                                    <div>
                                        {surveyquest?.status_result === 'CHECKED_BY_MAIN_EXPERT' ? (
                                            <div>
                                                <div>
                                                    {surveyquest?.expert_review?.map(
                                                        (itemReviewList) => {
                                                            return itemReviewList?.soft_review.map(
                                                                (itemReview, index) => {
                                                                    if (item.id == itemReview.q_id)
                                                                        return (
                                                                            <div
                                                                                key={index}
                                                                                style={{
                                                                                    display: 'flex',
                                                                                    flexDirection:
                                                                                        'column',
                                                                                    marginTop: 10,
                                                                                }}
                                                                            >
                                                                                <Text
                                                                                    style={{
                                                                                        marginTop: 5,
                                                                                    }}
                                                                                >
                                                                                    <span
                                                                                        style={{
                                                                                            marginRight: 10,
                                                                                            fontWeight:
                                                                                                'bold',
                                                                                        }}
                                                                                    >
                                                                                        Выставленные
                                                                                        баллы
                                                                                        эксперта{' '}
                                                                                        {
                                                                                            itemReviewList.user_id
                                                                                        }
                                                                                        :
                                                                                    </span>

                                                                                    {
                                                                                        itemReview.score
                                                                                    }
                                                                                </Text>
                                                                                <Text>
                                                                                    <span
                                                                                        style={{
                                                                                            marginRight: 10,
                                                                                            fontWeight:
                                                                                                'bold',
                                                                                        }}
                                                                                    >
                                                                                        Ревью
                                                                                        эксперта{' '}
                                                                                        {
                                                                                            itemReviewList.user_id
                                                                                        }
                                                                                        :
                                                                                    </span>
                                                                                    {
                                                                                        itemReview.comment
                                                                                    }
                                                                                </Text>
                                                                            </div>
                                                                        )
                                                                }
                                                            )
                                                        }
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
                                            </div>
                                        ) : (
                                            <></>
                                        )}

                                        <Form.Item
                                            name={[index, 'q_id']}
                                            initialValue={item.id}
                                            style={{ display: 'none' }}
                                        ></Form.Item>
                                        <Form.Item
                                            label={
                                                <Text style={{ fontWeight: 'bold', marginTop: 12 }}>
                                                    Оценка
                                                </Text>
                                            }
                                            name={[index, 'score']}
                                            initialValue={0}
                                        >
                                            <InputNumber size="small" min={0} />
                                        </Form.Item>
                                        <Form.Item
                                            label={
                                                <Text style={{ fontWeight: 'bold' }}>Ревью</Text>
                                            }
                                            name={[index, 'comment']}
                                            initialValue={''}
                                        >
                                            <Input.TextArea />
                                        </Form.Item>
                                    </div>
                                ) : (
                                    <></>
                                )}

                                <Line />
                                <ActionButton
                                    arrayIndex={arrayIndex}
                                    surveyquest_length={surveyquest?.survey?.softquestions?.length}
                                />
                            </div>
                        ))}
                </div>
            </Form>
        </div>
    )
}

SoftTestExMo.propTypes = {
    surveyquest: PropTypes.object,
    role: PropTypes.string,
}

export default SoftTestExMo
