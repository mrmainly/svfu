import React, { useState } from 'react'
import { Typography, Form, Space } from 'antd'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { Line, MultipleChoice, OneChoice, DetailedResponse } from '../../../../../components'
import TheoreticalAnswerModal from '../modals/TheoreticalAnswerModal'
import FailedModal from '../modals/FailedModal'
import { useModal } from '../../../../../hooks'
import ActionButton from '../../../../../constructor/parts/compoentns/action-button'

const { Text, Title } = Typography

const TheoreticalPart = ({ surveyquest, id }) => {
    const [openModal, setOpenModal] = useState(false)
    const [postList, setPostList] = useState([])
    const { open, handleClose, handleOpen } = useModal()

    const { arrayIndex } = useSelector((state) => state.survey_slice)

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
                handleOpenFailedModal={handleOpen}
            />
            <FailedModal open={open} handleClose={handleClose} />
            <Form
                style={{ display: 'flex', flexDirection: 'column' }}
                onFinish={onSubmitFurther}
                id="my-form"
            >
                {surveyquest.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            display: index === arrayIndex ? 'flex' : 'none',
                            flexDirection: 'column',
                        }}
                    >
                        <Title level={4}>Вопрос №{arrayIndex + 1}</Title>
                        <Text style={{ marginTop: 12 }}>{item.question?.description}</Text>
                        {item.question?.task && (
                            <Text style={{ marginTop: 12 }}>
                                Задание: <span>{item.question?.task}</span>
                            </Text>
                        )}

                        {item.question.under_questions?.length &&
                            item.question.under_questions.map((item, index) => (
                                <Space key={index} direction="vertical" style={{ marginTop: 20 }}>
                                    <Text style={{ fontWeight: 'bold' }}>{item.label}</Text>
                                    <Text>{item.hint}</Text>
                                </Space>
                            ))}

                        {item?.question?.question_images[0]?.length && (
                            <div style={{ display: 'flex', flexDirection: ' column' }}>
                                {item.question?.question_images.map((itemImage, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            height: 150,
                                            objectFit: 'cover',
                                            marginTop: 20,
                                            background: `url(${itemImage.image})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'contain',
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                        {item.question.technique === 'ONE_CHOICE' && <OneChoice item={item} />}
                        {item.question.technique === 'MULTIPLE_CHOICE' && (
                            <MultipleChoice item={item} />
                        )}
                        {item.question.technique === 'DESCRIBE' && <DetailedResponse item={item} />}

                        <Line />
                        <ActionButton
                            arrayIndex={arrayIndex}
                            surveyquest_length={surveyquest?.length}
                        />
                    </div>
                ))}
            </Form>
        </div>
    )
}

TheoreticalPart.propTypes = {
    surveyquest: PropTypes.array,
    id: PropTypes.number,
}

export default TheoreticalPart
