/* eslint-disable no-unused-vars */
import { useEffect } from 'react'
import { Button, Form, Tabs, message, Spin } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useLocation } from 'react-router-dom'

import 'react-summernote/dist/react-summernote.css'
import 'bootstrap/js/dist/modal'
import 'bootstrap/js/dist/dropdown'
import 'bootstrap/js/dist/tooltip'
import 'bootstrap/dist/css/bootstrap.css'

import TestSoftEditor from './components/tabs/editor'
import TestSoftComments from './components/tabs/comments'
import TestSoftParameters from './components/tabs/parameters'
import { useGetManagerQuestionEditIdQuery } from '../../../services/manager/question-bank/QuestionEdit'
import { ConstructorQuestionSlice } from '../../../reducers/ConstructorQuestionSlice'

const QuestionEditPage = () => {
    const location = useLocation()
    const dispatch = useDispatch()

    const state = location.state
    const { id } = state
    const { data, isFetching } = useGetManagerQuestionEditIdQuery({ id: id })

    const { questionType } = useSelector((state) => state.constructor_question_slice)
    const { handleTechnique } = ConstructorQuestionSlice.actions

    useEffect(() => {
        dispatch(handleTechnique(data?.technique))
    }, [data])

    if (isFetching) {
        return (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 400,
                }}
            >
                <Spin />
            </div>
        )
    }

    console.log(data)

    return (
        <div>
            <Form
                layout={'horizontal'}
                initialValues={{
                    ['description']: data.description,
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
                        <TestSoftEditor data={data} />
                    </Tabs.TabPane>
                    {data.question_type === 'SOFT' && (
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

export default QuestionEditPage
