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
    useQuestionCreateStepTwoPostMutation,
    useQuestionCreateStepThreePostMutation,
} from '../../../services/manager/question-bank/QuestionCreate'
import ROUTES from '../../../routes'

const QuestionCreatePage = () => {
    const [questionCreateStepOne, { isLoading: isStepOneLoading }] =
        useQuestionCreateStepOnePostMutation()
    const [questionCreateStepTwo, { isLoading: isStepTwoLoading }] =
        useQuestionCreateStepTwoPostMutation()
    const [questionCreateStepThree, { isLoading: isStepThreeLaoding }] =
        useQuestionCreateStepThreePostMutation()

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
        }).then((res) => {
            questionCreateStepTwo({ id: res.data.question_id, body: {} }).then((res) => {
                if (technique === 'ONE_CHOICE' || technique === 'MULTIPLE_CHOICE') {
                    questionCreateStepThree({
                        id: res.data.question_id,
                        body: data.questions.map((item) => {
                            return {
                                name: item.name,
                                score: item.score,
                                is_true: questionType === 'HARD' ? true : false,
                            }
                        }),
                    }).then((res) => {
                        if (res.data) {
                            message.success(`${questionType} вопрос создан`)
                            navigate(ROUTES.MANAGER_QUESTIONS_PAGE)
                        } else {
                            message.error('Вопрос не создан')
                        }
                    })
                } else {
                    if (res.data) {
                        message.success(`${questionType} вопрос создан`)
                        navigate(ROUTES.MANAGER_QUESTIONS_PAGE)
                    } else {
                        message.error('Вопрос не создан')
                    }
                }
            })
        })
    }

    return (
        <div>
            {isStepOneLoading ||
                isStepTwoLoading ||
                (isStepThreeLaoding && (
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
                ))}
            <Form
                layout={'horizontal'}
                onFinish={onFinish}
                style={{
                    opacity: isStepOneLoading || isStepTwoLoading || isStepThreeLaoding ? 0.4 : 1,
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
