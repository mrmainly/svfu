/* eslint-disable no-unused-vars */
import { Button, Form, Tabs } from 'antd'
import { useSelector } from 'react-redux'

import 'react-summernote/dist/react-summernote.css'
import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/tooltip'
import 'bootstrap/dist/css/bootstrap.css'

import TestSoftEditor from './components/tabs/editor'
import TestSoftComments from './components/tabs/comments'
import TestSoftParameters from './components/tabs/parameters'
<<<<<<< HEAD
import {
    useQuestionCreateStepOnePostMutation,
    useQuestionCreateStepTwoPostMutation,
    useQuestionCreateStepThreePostMutation,
} from '../../../services/manager/question-bank/QuestionCreate'

const QuestionCreatePage = () => {
    const [questionCreateStepOne] = useQuestionCreateStepOnePostMutation()
    const [questionCreateStepTwo] = useQuestionCreateStepTwoPostMutation()
    const [questionCreateStepThree] = useQuestionCreateStepThreePostMutation()
=======

const QuestionCreatePage = () => {
>>>>>>> 5c527d2e02a26f0af9d265d0180735e004ae73c2

    const { questionType, technique } = useSelector((state) => state.constructor_question_slice)

<<<<<<< HEAD
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
                    })
                }
            })
        })
        console.log(data)
=======
    const onFinish = () => {
        // questionCreateStepOne({
            
        // }).then(() => {

        // })
>>>>>>> 5c527d2e02a26f0af9d265d0180735e004ae73c2
    }

    return (
        <div>
            <Form layout={'horizontal'} onFinish={onFinish}>
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
