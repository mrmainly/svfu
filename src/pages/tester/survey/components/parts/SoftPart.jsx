/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Typography, Form, Image, Select, Checkbox, Radio, Spin, Divider } from 'antd'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'

import { Line } from '../../../../../components'
import TheoreticalAnswerModal from '../modals/TheoreticalAnswerModal'
import FailedModal from '../modals/FailedModal'
import { useModal } from '../../../../../hooks'
import ActionButton from '../../../../../constructor/parts/components/ActionButton'
import TextArea from 'antd/lib/input/TextArea'
import { useGetTesterSurveyIdQuery } from '../../../../../services/tester/Surveys'
import MatchingQuestion from '../questions/MatchingQuestion'
import InputIntQuestion from '../questions/InpitIntQuestion'
import OneChoiceQuestion from '../questions/OneChoiceQuestion'
import PollQuestion from '../questions/PollQuestion'
import DescribeQuestion from '../questions/DescribeQuestion'
import MatrixQuestion from '../questions/MatrixQuestion'
import MultipleChoiceQuestion from '../questions/MultipleChoiceQuestion'

const { Text, Title } = Typography
const { Option } = Select

const SoftPart = ({ id }) => {
    const { isLoading: isSurveyQuestionsLoading } = useGetTesterSurveyIdQuery({ id: id })
    const [openModal, setOpenModal] = useState(false)
    const [postList, setPostList] = useState([])
    const { open, handleClose, handleOpen } = useModal()

    const { arrayIndex, getSurveyData } = useSelector((state) => state.survey_slice)

    const onSubmit = (data) => {
        const postData = getSurveyData.map((item, index) => {
            if (item.technique === 'MATRIX') {
                const post_matrix = []
                data[index]?.matrix_answers.forEach((item) =>
                    item?.answers?.a_id.forEach((itemAnswer) => {
                        post_matrix.push({ a_id: itemAnswer })
                    })
                )
                return {
                    ...post_matrix,
                    chapter_id: item.chapterId,
                    q_id: item.id,
                }
            }
            return {
                ...data[index],
                chapter_id: item.chapterId,
                q_id: item.id,
            }
        })

        // const postData = {
        //     answers: [],
        // }
        // abjArr.forEach(([key, value]) => {
        //     if (Array.isArray(value.q_a) && value.table_quest === undefined) {
        //         value?.q_a.forEach((item) => {
        //             postData?.answers.push({ q_id: Number(key), q_a: item, q_d: value.q_d })
        //         })
        //     } else {
        //         const table_quest = []
        //         value?.table_quest?.forEach((element) => {
        //             if (typeof element?.answers === 'string') {
        //                 table_quest.push({ name: element.name, answers: element.answers })
        //             } else {
        //                 element?.answers?.forEach((elem) => {
        //                     table_quest.push({ name: element.name, answers: elem })
        //                 })
        //             }
        //         })
        //         postData.answers.push({
        //             q_id: Number(key),
        //             q_a: undefined,
        //             q_d: value.q_d,
        //             table_quest: table_quest,
        //         })
        //     }
        // })
        setOpenModal(true)
        setPostList(postData)
    }
    if (isSurveyQuestionsLoading) {
        return <Spin />
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
                onFinish={onSubmit}
            >
                {getSurveyData?.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            display: index === arrayIndex ? 'flex' : 'none',
                            flexDirection: 'column',
                        }}
                    >
                        <div>{item.chapterName}</div>
                        <Divider />
                        <Title level={4}>Вопрос №{arrayIndex + 1}</Title>

                        <div style={{ marginTop: 12 }}>
                            <Text style={{ fontWeight: 'bold' }}>Задание: </Text>
                            <div
                                style={{ marginTop: 10 }}
                                dangerouslySetInnerHTML={{ __html: item.description }}
                            ></div>
                        </div>

                        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Ответ: </Text>

                        {item.technique === 'INPUT_INT' && (
                            <InputIntQuestion
                                countInput={item.question_input.count_input}
                                answerIndex={index}
                            />
                        )}
                        {item.technique === 'ONE_CHOICE' && (
                            <OneChoiceQuestion
                                variants={item.question_choice_variants}
                                answerIndex={index}
                            />
                        )}
                        {item.technique === 'POLL' && (
                            <PollQuestion questionPoll={item.question_poll} answerIndex={index} />
                        )}
                        {item.technique === 'DESCRIBE' && <DescribeQuestion answerIndex={index} />}
                        {item.technique === 'MATCHING' && (
                            <MatchingQuestion
                                firstColumn={item.matching_variants_first}
                                secondColumn={item.matching_variants_second}
                                answerIndex={index}
                            />
                        )}
                        {item.technique === 'MATRIX' && (
                            <MatrixQuestion
                                questionMatrix={item.question_matrix}
                                answerIndex={index}
                            />
                        )}
                        {item.technique === 'MULTIPLE_CHOICE' && (
                            <MultipleChoiceQuestion
                                questionVariants={item.question_choice_variants}
                                answerIndex={index}
                            />
                        )}

                        <Line />
                        <ActionButton
                            arrayIndex={arrayIndex}
                            surveyquest_length={getSurveyData?.length}
                        />
                        {/*{item?.question_images?.length > 0 && (*/}
                        {/*    <div*/}
                        {/*        style={{ display: 'flex', flexDirection: ' column', marginTop: 12 }}*/}
                        {/*    >*/}
                        {/*        {item?.question_images.map((itemImage, index) => (*/}
                        {/*            <Image key={index} width={100} src={`${itemImage.image}`} />*/}
                        {/*        ))}*/}
                        {/*    </div>*/}
                        {/*)}*/}
                        {/*{item?.question_files?.length > 0 && (*/}
                        {/*    <a*/}
                        {/*        href={item?.question_files[0].file}*/}
                        {/*        target="_blank"*/}
                        {/*        rel="noopener noreferrer"*/}
                        {/*        style={{ marginTop: 12 }}*/}
                        {/*    >*/}
                        {/*        {decodeURI(item?.question_files[0].file).split('/')[5]}*/}
                        {/*    </a>*/}
                        {/*)}*/}
                        {/*{item.variants?.length > 0 && (*/}
                        {/*    <Form.Item*/}
                        {/*        name={[item.id, 'q_a']}*/}
                        {/*        label={*/}
                        {/*            <Text style={{ fontWeight: 'bold', marginTop: 12 }}>*/}
                        {/*                Варианты ответа:*/}
                        {/*            </Text>*/}
                        {/*        }*/}
                        {/*        initialValue={[]}*/}
                        {/*    >*/}
                        {/*        <Checkbox.Group*/}
                        {/*            style={{*/}
                        {/*                display: 'flex',*/}
                        {/*                flexDirection: 'column',*/}
                        {/*                marginTop: '-10px',*/}
                        {/*            }}*/}
                        {/*        >*/}
                        {/*            {item.variants.map((item, index) => (*/}
                        {/*                <Checkbox*/}
                        {/*                    style={{*/}
                        {/*                        marginTop: 10,*/}
                        {/*                        marginLeft: 1,*/}
                        {/*                    }}*/}
                        {/*                    key={index}*/}
                        {/*                    value={item.name}*/}
                        {/*                >*/}
                        {/*                    {item.name}*/}
                        {/*                </Checkbox>*/}
                        {/*            ))}*/}
                        {/*        </Checkbox.Group>*/}
                        {/*    </Form.Item>*/}
                        {/*)}*/}
                        {/*{item.table_quest?.length > 0 &&*/}
                        {/*    item.table_quest.map((item2, index) => (*/}
                        {/*        <div key={index} style={{ marginTop: 12 }}>*/}
                        {/*            <Form.Item*/}
                        {/*                name={[item.id, 'table_quest', index, 'name']}*/}
                        {/*                initialValue={item2.name}*/}
                        {/*                style={{ display: 'none' }}*/}
                        {/*            ></Form.Item>*/}
                        {/*            <Form.Item*/}
                        {/*                name={[item.id, 'table_quest', index, 'answers']}*/}
                        {/*                label={*/}
                        {/*                    <Text style={{ fontWeight: 'bold' }}>{item2.name}</Text>*/}
                        {/*                }*/}
                        {/*                initialValue={[]}*/}
                        {/*            >*/}
                        {/*                {item2.is_one ? (*/}
                        {/*                    <Radio.Group*/}
                        {/*                        style={{*/}
                        {/*                            display: 'flex',*/}
                        {/*                            flexDirection: 'column',*/}
                        {/*                        }}*/}
                        {/*                    >*/}
                        {/*                        {item2.variants.map((item, index) => (*/}
                        {/*                            <Radio*/}
                        {/*                                value={item.name}*/}
                        {/*                                key={index}*/}
                        {/*                                style={{*/}
                        {/*                                    marginTop: 5,*/}
                        {/*                                }}*/}
                        {/*                            >*/}
                        {/*                                {item.name}*/}
                        {/*                            </Radio>*/}
                        {/*                        ))}*/}
                        {/*                    </Radio.Group>*/}
                        {/*                ) : (*/}
                        {/*                    <Checkbox.Group*/}
                        {/*                        style={{*/}
                        {/*                            display: 'flex',*/}
                        {/*                            flexDirection: 'column',*/}
                        {/*                        }}*/}
                        {/*                    >*/}
                        {/*                        {item2.variants.map((item, index) => (*/}
                        {/*                            <Checkbox*/}
                        {/*                                value={item.name}*/}
                        {/*                                key={index}*/}
                        {/*                                style={{*/}
                        {/*                                    marginLeft: index === 0 && 8,*/}
                        {/*                                    marginTop: 5,*/}
                        {/*                                }}*/}
                        {/*                            >*/}
                        {/*                                {item.name}*/}
                        {/*                            </Checkbox>*/}
                        {/*                        ))}*/}
                        {/*                    </Checkbox.Group>*/}
                        {/*                )}*/}
                        {/*            </Form.Item>*/}
                        {/*        </div>*/}
                        {/*    ))}*/}
                        {/*{item.is_describe && (*/}
                        {/*    <Form.Item*/}
                        {/*        name={[item.id, 'q_d']}*/}
                        {/*        label={*/}
                        {/*            <Text style={{ fontWeight: 'bold', marginTop: 12 }}>*/}
                        {/*                Ответ:*/}
                        {/*            </Text>*/}
                        {/*        }*/}
                        {/*    >*/}
                        {/*        <TextArea />*/}
                        {/*    </Form.Item>*/}
                        {/*)}*/}
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
