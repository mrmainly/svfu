/* eslint-disable no-unused-vars */
import { Button, Form, Tabs, message, Spin } from 'antd'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import 'react-summernote/dist/react-summernote.css'
import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/tooltip'
import 'bootstrap/dist/css/bootstrap.css'

import TestSoftEditor from '../components/tabs/editor'
import TestSoftComments from '../components/tabs/comments'
import TestSoftParameters from '../components/tabs/parameters'
import {
    useQuestionCreateStepOnePostMutation,
    useQuestionCreateChoiseMutation,
    useQuestionCreateInputPostMutation,
    useQuestionDeleteMutation,
    useQuestionCreateMatchingPostMutation,
    useQuestionCreateMatrixPostMutation,
    useQuestionCreatePollPostMutation,
} from '../../../../services/manager/question-bank/QuestionCreate'
import ROUTES from '../../../../routes'

const QuestionCreatePage = () => {
    const [questionCreateStepOne, { isLoading: isStepOneLoading }] =
        useQuestionCreateStepOnePostMutation()
    const [questionCreateChoise, { isLoading: isCreateChoiseLaoding }] =
        useQuestionCreateChoiseMutation()
    const [questionCreateInput, { isLoading: isCreateInputLaoding }] =
        useQuestionCreateInputPostMutation()
    const [questionDelete, { isLoading: isDeleteQuestionLaoding }] = useQuestionDeleteMutation()
    const [questionCreateMatching, { isLoading: isCreateMatchingLoading }] =
        useQuestionCreateMatchingPostMutation()
    const [questionCreateMatrix, { isLoading: isCreateMatrixLoading }] =
        useQuestionCreateMatrixPostMutation()
    const [questionCreatePoll, { isLoading: isCreatePollLoading }] =
        useQuestionCreatePollPostMutation()

    const { questionType, technique } = useSelector((state) => state.constructor_question_slice)
    const navigate = useNavigate()

    const onFinish = (data) => {
        questionCreateStepOne({
            description: data.description,
            direction: data.direction,
            question_type: questionType,
            is_active: data.is_active,
            time: data.time,
            difficulty: data.difficulty,
            technique: technique,
            use_criterion: data?.use_criterion,
            criterion: data?.criterion,
            expert_review: data?.expert_review,
            comment: data?.comment,
        }).then((mainResponse) => {
            if (mainResponse.data && technique !== '') {
                if (technique === 'ONE_CHOICE' || technique === 'MULTIPLE_CHOICE') {
                    questionCreateChoise({
                        id: mainResponse.data.question_id,
                        body: data.questions.map((item) => {
                            return {
                                name: item.name,
                                score: item.score,
                                is_true: questionType === 'HARD' ? true : false,
                            }
                        }),
                    }).then((res) => {
                        if (res.data) {
                            message.success('Вопрос с вариантами ответов создана')
                            navigate(ROUTES.MANAGER_QUESTIONS_PAGE)
                        } else {
                            message.error('Вопрос не создан')
                            questionDelete({ id: res.data.question_id })
                        }
                    })
                } else if (technique === 'INPUT_INT' || technique === 'INPUT_TEXT') {
                    questionCreateInput({
                        id: mainResponse.data.question_id,
                        body: {
                            input_answers: data.questions.map((item, index) => {
                                return {
                                    a_id: index + 1,
                                    input_text: item.input_text,
                                    score: item.score,
                                    input_int: item.input_int,
                                }
                            }),
                        },
                    }).then((res) => {
                        if (res.data) {
                            message.success('Вопрос с полями ввода созданы')
                            navigate(ROUTES.MANAGER_QUESTIONS_PAGE)
                        } else {
                            message.error('Вопрос не создан')
                            questionDelete({ id: mainResponse.data.question_id })
                        }
                    })
                } else if (technique === 'MATCHING') {
                    questionCreateMatching({
                        id: mainResponse.data.question_id,
                        body: data.questions.map((item, index) => {
                            return {
                                first_string: item.first_string,
                                score: item.score,
                                second_string: item.first_string,
                                order_num: index + 1,
                            }
                        }),
                    }).then((res) => {
                        if (res.data) {
                            message.success('Вопрос с установлением соответствий создан')
                            navigate(ROUTES.MANAGER_QUESTIONS_PAGE)
                        } else {
                            message.error('Вопрос не создан')
                            questionDelete({ id: mainResponse.data.question_id })
                        }
                    })
                } else if (technique === 'MATRIX') {
                    questionCreateMatrix({
                        id: mainResponse.data.question_id,
                        body: data.table_quest.map((item) => {
                            return {
                                name: item?.name,
                                score: item?.score,
                                answers: item?.answers.map((item, index) => {
                                    return {
                                        name: item.name,
                                        score: item.score,
                                        a_id: index + 1,
                                        is_true: item?.is_true,
                                    }
                                }),
                            }
                        }),
                    }).then((res) => {
                        if (res.data) {
                            message.success('Matrix вопрос создан')
                            navigate(ROUTES.MANAGER_QUESTIONS_PAGE)
                        } else {
                            message.error('Вопрос не создан')
                            questionDelete({ id: mainResponse.data.question_id })
                        }
                    })
                } else if (technique === 'POLL') {
                    questionCreatePoll({
                        id: mainResponse.data.question_id,
                        body: {
                            strings: data.strings.map((item, index) => {
                                return {
                                    id_string: index + 1,
                                    name: item.strings_name,
                                }
                            }),
                            columns: data.columns.map((item, index) => {
                                return {
                                    name: item.columns_name,
                                    id_column: index + 1,
                                    score: item.score,
                                }
                            }),
                        },
                    }).then((res) => {
                        if (res.data) {
                            message.success('POLL вопрос создан')
                            navigate(ROUTES.MANAGER_QUESTIONS_PAGE)
                        } else {
                            message.error('Вопрос не создан')
                            questionDelete({ id: mainResponse.data.question_id })
                        }
                    })
                }
            } else {
                message.error(
                    technique === '' ? 'Вы не добавили вариант вопроса' : 'Не все поля были введины'
                )
            }
        })
        console.log(data)
    }

    const allLoading = () => {
        if (
            isStepOneLoading ||
            isCreateChoiseLaoding ||
            isCreateInputLaoding ||
            isDeleteQuestionLaoding ||
            isCreateMatchingLoading ||
            isCreateMatrixLoading ||
            isCreatePollLoading
        ) {
            return true
        } else {
            return false
        }
    }

    return (
        <div>
            {allLoading() && (
                <div
                    style={{
                        top: '50%',
                        position: 'fixed',
                        height: '100vh',
                        width: '100%',
                        zIndex: 1,
                        left: '50%',
                    }}
                >
                    <Spin size="large" />
                </div>
            )}
            <Form
                layout={'horizontal'}
                onFinish={onFinish}
                style={{
                    opacity: allLoading() ? 0.4 : 1,
                }}
            >
                <Tabs
                    defaultActiveKey="1"
                    type={'card'}
                    tabBarExtraContent={
                        <Button size="large" htmlType="submit">
                            Создать вопрос
                        </Button>
                    }
                >
                    <Tabs.TabPane tab={'Редактор'} key={'1'}>
                        <TestSoftEditor />
                    </Tabs.TabPane>
                    {questionType === 'SOFT' && (
                        <Tabs.TabPane tab={'Блок комиссии'} key={'2'}>
                            <TestSoftComments />
                        </Tabs.TabPane>
                    )}
                    <Tabs.TabPane tab={'Параметры'} key={'3'}>
                        <TestSoftParameters />
                    </Tabs.TabPane>
                </Tabs>
            </Form>
        </div>
    )
}

export default QuestionCreatePage
