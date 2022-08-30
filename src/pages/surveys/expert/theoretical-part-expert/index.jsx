import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Typography, Space } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { Line, MyButton } from '../../../../components'
import { SurveysSlice } from '../../../../reducers/SurveysSlice'
// import TheoreticalAnswerModal from './components/modals/TheoreticalAnswerModal'

const { Text, Title } = Typography

const TheoreticalPartExpert = () => {
    const [openModal, setOpenModal] = useState(false)
    const [postList, setPostList] = useState([])

    const { arrayIndex } = useSelector((state) => state.survey_slice)
    const { handleArrayIndex } = SurveysSlice.actions

    const location = useLocation()
    const state = location.state
    const dispatch = useDispatch()

    const { surveyquest, id } = state

    // const onSubmitFurther = (data) => {
    //     console.log(data)
    //     const postData = {
    //         answers: [],
    //     }
    //     const abjArr = Object.entries(data)
    //     abjArr.forEach(([key, value]) => {
    //         if (Array.isArray(value)) {
    //             value.forEach((item) => {
    //                 postData.answers.push({ q_id: Number(key), a_id: item })
    //             })
    //         } else {
    //             postData.answers.push({ q_id: Number(key), a_id: value })
    //         }
    //     })
    //     setOpenModal(true)
    //     setPostList(postData)
    // }

    const sum = (question_id, array) => {
        const newArray = array
            .map((itemAnswer) => {
                // const total_score = this.answer[index]
                if (itemAnswer.question_id === question_id) return itemAnswer.score
            })
            .filter((element) => element != undefined)
            .reduce((prev, curr) => prev + curr, 0)
        return newArray
    }

    return (
        <div>
            {/* <TheoreticalAnswerModal
                open={openModal}
                setOpen={setOpenModal}
                id={id}
                postData={postList}
            /> */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {surveyquest?.survey?.surveyquest.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            display: index === arrayIndex ? 'flex' : 'none',
                            flexDirection: 'column',
                        }}
                    >
                        <Title level={4}>Вопрос №{arrayIndex + 1}</Title>
                        <Text style={{ marginTop: 12 }}>{item.question.description}</Text>
                        <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Варианты ответа:</Text>
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
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <Space>
                                <Text>Ответ аттестуемого:</Text>
                                {surveyquest.answers_first_part.map((itemAnswer, index) => {
                                    if (itemAnswer.question_id === item.question.id)
                                        return (
                                            <Text style={{ fontWeight: 'bold' }} key={index}>
                                                {itemAnswer.answer}
                                            </Text>
                                        )
                                })}
                            </Space>
                            <Space style={{ marginTop: 10 }}>
                                <Text>Балл:</Text>
                                {sum(item.question.id, surveyquest.answers_first_part)}
                            </Space>
                        </div>

                        <Line />
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                        >
                            {arrayIndex === 0 ? (
                                ''
                            ) : (
                                <MyButton
                                    onClick={() => {
                                        dispatch(handleArrayIndex(arrayIndex - 1))
                                    }}
                                >
                                    Назад
                                </MyButton>
                            )}
                            {surveyquest?.survey?.surveyquest?.length - 1 === arrayIndex ? (
                                ''
                            ) : (
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        width: '100%',
                                    }}
                                >
                                    <MyButton
                                        onClick={() => {
                                            dispatch(handleArrayIndex(arrayIndex + 1))
                                        }}
                                    >
                                        Далее
                                    </MyButton>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TheoreticalPartExpert
