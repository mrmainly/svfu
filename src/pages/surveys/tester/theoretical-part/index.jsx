import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Typography, Radio, Space, Checkbox, Form } from 'antd'
import { useSelector, useDispatch } from 'react-redux'

import { Line, MyButton } from '../../../../components'
import { SurveysSlice } from '../../../../reducers/SurveysSlice'
import TheoreticalAnswerModal from './components/modals/TheoreticalAnswerModal'

const { Text, Title } = Typography

const TheoreticalPart = () => {
    const [openModal, setOpenModal] = useState(false)
    const [postList, setPostList] = useState([])

    const { arrayIndex } = useSelector((state) => state.survey_slice)
    const { handleArrayIndex } = SurveysSlice.actions

    const location = useLocation()
    const state = location.state
    const dispatch = useDispatch()

    const { surveyquest, id } = state

    console.log(surveyquest)

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
            <TheoreticalAnswerModal
                open={openModal}
                setOpen={setOpenModal}
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
                            {item?.question?.question_images[0]?.image && (
                                <img
                                    src={item?.question?.question_images[0]?.image}
                                    style={{
                                        height: 200,
                                        width: 300,
                                        objectFit: 'cover',
                                        marginTop: 20,
                                    }}
                                />
                            )}
                            {item.question.technique === 'ONE_CHOICE' ? (
                                <>
                                    <Form.Item
                                        name={item.question.id}
                                        htmlFor={item.id}
                                        style={{ marginTop: 20 }}
                                        labelCol={{ span: 24 }}
                                        label={
                                            <Text style={{ fontSize: 16 }}>
                                                Выберите несколько ответов
                                            </Text>
                                        }
                                    >
                                        <Radio.Group style={{ marginTop: '-10px' }}>
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
                            ) : (
                                <>
                                    <Form.Item
                                        name={item.question.id}
                                        htmlFor={item.id}
                                        labelCol={{ span: 24 }}
                                        label={
                                            <Text style={{ fontSize: 16 }}>
                                                Выберите несколько ответов
                                            </Text>
                                        }
                                        style={{ marginTop: 20 }}
                                    >
                                        <Checkbox.Group
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                marginTop: '-10px',
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

export default TheoreticalPart
