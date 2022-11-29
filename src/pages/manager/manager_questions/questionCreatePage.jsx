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
import { useQuestionCreateStepOnePostMutation } from '../../../services/manager/question-bank/QuestionCreate'

const QuestionCreatePage = () => {
    const [questionCreateStepOne] = useQuestionCreateStepOnePostMutation()

    const { questionType } = useSelector((state) => state.constructor_question_slice)

    const onFinish = (data) => {
        // questionCreateStepOne({
            
        // }).then(() => {

        // })
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
