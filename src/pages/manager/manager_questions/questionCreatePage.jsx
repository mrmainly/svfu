/* eslint-disable no-unused-vars */
import { Button, Form, Tabs, message, Spin } from 'antd'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import 'react-summernote/dist/react-summernote.css'
import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/tooltip'
import 'bootstrap/dist/css/bootstrap.css'

import TestSoftEditor from './components/tabs/editor'
import TestSoftComments from './components/tabs/comments'
import TestSoftParameters from './components/tabs/parameters'
import {
    useQuestionCreateStepOnePostMutation,
    useQuestionCreateChoiseMutation,
    useQuestionCreateInputPostMutation,
    useQuestionDeleteMutation,
} from '../../../services/manager/question-bank/QuestionCreate'
import ROUTES from '../../../routes'

const QuestionCreatePage = () => {
    const [questionCreateStepOne, { isLoading: isStepOneLoading }] =
        useQuestionCreateStepOnePostMutation()
    const [questionCreateChoise, { isLoading: isCreateChoiseLaoding }] =
        useQuestionCreateChoiseMutation()
    const [questionCreateInput, { isLoading: isCreateInputLaoding }] =
        useQuestionCreateInputPostMutation()
    const [questionDelete, { isLoading: isDeleteQuestionLaoding }] = useQuestionDeleteMutation()

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
            use_criterion: 'false',
        }).then((mainResponse) => {
            if (mainResponse.data) {
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
                            input_answers: data.questions.map((item) => {
                                return {
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
                }
            } else {
                message.error('Не все поля были введины')
            }
        })
    }

    const allLoading = () => {
        if (
            isStepOneLoading ||
            isCreateChoiseLaoding ||
            isCreateInputLaoding ||
            isDeleteQuestionLaoding
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
