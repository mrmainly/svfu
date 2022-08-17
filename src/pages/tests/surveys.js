import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Typography, Radio, Space, Checkbox, Input, Form } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { Line, MyButton, SurveyModalAnswer } from '../../components'
import { SurveysSlice } from '../../reducers/SurveysSlice'
import { useSurveyPostMutation } from '../../services/SurveysService'
import { NoStyleItemContext } from 'antd/lib/form/context'

const { Text, Title } = Typography

const Surveys = () => {
    const [openModal, setOpenModal] = useState(false)
    const [text, setText] = useState('')
    const [postList, setPostList] = useState([])

    const { arrayIndex } = useSelector((state) => state.survey_slice)
    const { handleArrayIndex } = SurveysSlice.actions
    const [postSurvey] = useSurveyPostMutation()

    const location = useLocation()
    const state = location.state
    const dispatch = useDispatch()

    const { surveyquest, id } = state

    const onSubmitFurther = (data) => {
        const postData = {
            answers: [],
        }
        const abjArr = Object.entries(data)
        abjArr.forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((item) => {
                    postData.answers.push({ q_id: Number(key), a_id: item })
                })
            } else {
                postData.answers.push({ q_id: Number(key), a_id: value })
            }
        })
        setOpenModal(true)
        setPostList(postData)
    }
    return (
        <div>
            <SurveyModalAnswer
                open={openModal}
                setOpen={setOpenModal}
                text={text}
                id={id}
                postData={postList}
            />
            <Form
                style={{ display: 'flex', flexDirection: 'column' }}
                onFinish={onSubmitFurther}
                id="my-form"
            >
                {surveyquest
                    // .filter((item, index) => index === arrayIndex)
                    .map((item, index) => (
                        <div
                            key={index}
                            style={{
                                display: index === arrayIndex ? 'flex' : 'none',
                                flexDirection: 'column',
                            }}
                        >
                            <Title level={4}>Вопрос №{arrayIndex + 1}</Title>
                            <Text style={{ marginTop: 12 }}>{item.question.description}</Text>
                            {item.question.technique === 'ONE_CHOICE' ? (
                                <>
                                    <Text
                                        style={{
                                            marginTop: 12,
                                            marginBottom: 12,
                                        }}
                                    >
                                        Выберите один ответ:
                                    </Text>
                                    <Form.Item
                                        name={item.id}
                                        labelCol={{ span: 24 }}
                                        htmlFor={item.id}
                                    >
                                        <Radio.Group>
                                            <Space direction="vertical">
                                                {item.question.variant.map((item, index) => (
                                                    <Radio value={item.id} key={index}>
                                                        {item.name}
                                                    </Radio>
                                                ))}
                                            </Space>
                                        </Radio.Group>
                                    </Form.Item>
                                </>
                            ) : item.question.technique === 'DESCRIBE' ? (
                                <div>
                                    <Text
                                        style={{
                                            marginTop: 12,
                                            marginBottom: 12,
                                        }}
                                    >
                                        Напишите ответ
                                    </Text>
                                    <Form.Item
                                        name={item.id}
                                        labelCol={{ span: 24 }}
                                        htmlFor={item.id}
                                    >
                                        <Space direction="vertical">
                                            <Input />
                                        </Space>
                                    </Form.Item>
                                </div>
                            ) : (
                                <>
                                    <Text
                                        style={{
                                            marginTop: 12,
                                            marginBottom: 12,
                                        }}
                                    >
                                        Выберите несколько ответов:
                                    </Text>
                                    <Form.Item
                                        name={item.id}
                                        labelCol={{ span: 24 }}
                                        htmlFor={item.id}
                                    >
                                        <Checkbox.Group
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            {item.question.variant.map((item, index) => (
                                                <Checkbox
                                                    style={{
                                                        marginTop: 10,
                                                        marginLeft: 1,
                                                    }}
                                                    key={index}
                                                    value={item.id}
                                                >
                                                    {item.name}
                                                </Checkbox>
                                            ))}
                                        </Checkbox.Group>
                                    </Form.Item>
                                </>
                            )}
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
                                {surveyquest.length - 1 === arrayIndex ? (
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
            </Form>
        </div>
    )
}

export default Surveys
