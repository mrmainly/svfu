/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import {
    Typography,
    Form,
    Image,
    Select,
    Checkbox,
    Descriptions,
    Button,
    Input,
    Col,
    Row,
} from 'antd'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { Line, MultipleChoice, OneChoice, DetailedResponse } from '../../../../../components'
import TheoreticalAnswerModal from '../modals/TheoreticalAnswerModal'
import FailedModal from '../modals/FailedModal'
import { useModal } from '../../../../../hooks'
import ActionButton from '../../../../../constructor/parts/compoentns/action-button'
import TextArea from 'antd/lib/input/TextArea'

const { Text, Title } = Typography
const { Option } = Select

const SoftPart = ({ softquestions, id }) => {
    const [openModal, setOpenModal] = useState(false)
    const [postList, setPostList] = useState([])
    const { open, handleClose, handleOpen } = useModal()

    const { arrayIndex } = useSelector((state) => state.survey_slice)

    const onSubmit = (data) => {
        const abjArr = Object.entries(data)
        const postData = {
            answers: [],
        }

        abjArr.forEach(([key, value]) => {
            if (Array.isArray(value.q_a) && value.table_quest === undefined) {
                value?.q_a.forEach((item) => {
                    postData?.answers.push({ q_id: Number(key), q_a: item, q_d: value.q_d })
                })
            } else {
                const table_quest = []
                value?.table_quest?.forEach((element) => {
                    element?.answers?.forEach((elem) => {
                        table_quest.push({ name: element.name, answers: elem })
                    })
                })
                postData.answers.push({
                    q_id: Number(key),
                    q_a: undefined,
                    q_d: value.q_d,
                    table_quest: table_quest,
                })
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
                unit_type="SOFT"
            />
            <FailedModal open={open} handleClose={handleClose} />
            <Form
                style={{ display: 'flex', flexDirection: 'column' }}
                id="soft-tester-form"
                layout="vertical"
                onFinish={onSubmit}
            >
                {softquestions.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            display: index === arrayIndex ? 'flex' : 'none',
                            flexDirection: 'column',
                        }}
                    >
                        <Title level={4}>Вопрос №{arrayIndex + 1}</Title>
                        <div style={{ marginTop: 12 }}>
                            <Text style={{ fontWeight: 'bold' }}>Описание: </Text>
                            <span>{item.description}</span>
                        </div>
                        <div style={{ marginTop: 12 }}>
                            <Text style={{ fontWeight: 'bold' }}>Задание: </Text>
                            <span>{item.name}</span>
                        </div>
                        {item?.question_images?.length > 0 && (
                            <div
                                style={{ display: 'flex', flexDirection: ' column', marginTop: 12 }}
                            >
                                {item?.question_images.map((itemImage, index) => (
                                    <Image key={index} width={100} src={`${itemImage.image}`} />
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
                        {item.variants?.length > 0 && (
                            <Form.Item
                                name={[item.id, 'q_a']}
                                label={
                                    <Text style={{ fontWeight: 'bold', marginTop: 12 }}>
                                        Варианты ответа:
                                    </Text>
                                }
                                initialValue={[]}
                            >
                                <Checkbox.Group
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        marginTop: '-10px',
                                    }}
                                >
                                    {item.variants.map((item, index) => (
                                        <Checkbox
                                            style={{
                                                marginTop: 10,
                                                marginLeft: 1,
                                            }}
                                            key={index}
                                            value={item.name}
                                        >
                                            {item.name}
                                        </Checkbox>
                                    ))}
                                </Checkbox.Group>
                            </Form.Item>
                        )}
                        {item.table_quest?.length > 0 &&
                            item.table_quest.map((item2, index) => (
                                <div key={index} style={{ marginTop: 12 }}>
                                    <Form.Item
                                        name={[item.id, 'table_quest', index, 'name']}
                                        initialValue={item2.name}
                                        style={{ display: 'none' }}
                                    ></Form.Item>
                                    <Form.Item
                                        name={[item.id, 'table_quest', index, 'answers']}
                                        label={
                                            <Text style={{ fontWeight: 'bold' }}>{item2.name}</Text>
                                        }
                                        initialValue={[]}
                                    >
                                        <Checkbox.Group
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                            }}
                                        >
                                            {item2.variants.map((item, index) => (
                                                <Checkbox
                                                    value={item.name}
                                                    key={index}
                                                    style={{
                                                        marginLeft: index === 0 && 8,
                                                        marginTop: 5,
                                                    }}
                                                >
                                                    {item.name}
                                                </Checkbox>
                                            ))}
                                        </Checkbox.Group>
                                    </Form.Item>
                                </div>
                            ))}
                        {item.is_describe && (
                            <Form.Item
                                name={[item.id, 'q_d']}
                                label={
                                    <Text style={{ fontWeight: 'bold', marginTop: 12 }}>
                                        Ответ:
                                    </Text>
                                }
                            >
                                <TextArea />
                            </Form.Item>
                        )}
                        <Line />
                        <ActionButton
                            arrayIndex={arrayIndex}
                            softquestions_length={softquestions?.survey.softquestions?.length}
                        />
                    </div>
                ))}
            </Form>
        </div>
    )
}

SoftPart.propTypes = {
    softquestions: PropTypes.array,
    id: PropTypes.number,
}

export default SoftPart
