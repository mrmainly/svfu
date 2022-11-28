// eslint-disable-next-line no-unused-vars
import { Button, Card, Collapse, Form, Space } from 'antd'
import { DeleteTwoTone, PlusOutlined, SettingTwoTone, DeleteOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import QuestionDrawer from './drawer'
import questions from './mock'
import './questions.css'
import {ConstructorQuestionSlice} from '../../../../../../../reducers/ConstructorQuestionSlice'

const ObrTestQuestions = () => {

    const {deleteElement, initializationQuestionList} = ConstructorQuestionSlice.actions
    const { testQuestionList } = useSelector(
        (state) => state.constructor_question_slice
    );

    const dispatch = useDispatch()


    console.log("testQuestionList", testQuestionList)
    const [open, setOpen] = useState(false)
    const [id, setId] = useState()
    console.log("id", id)
    const showDrawer = (index) => {
        setOpen(true)
        setId(index)
    }
    const onClose = () => {
        setOpen(false)
    }
    useEffect(() => {
            dispatch(initializationQuestionList(questions))
    },[])
    return (
        <div className="card-container">
            <QuestionDrawer open={open} onClose={onClose} chapterId={id}/>
            <Form.List name={'chapters'}>
                {(fields, {add, remove}) => (
                    <>
                    <Collapse ghost={true}>
                        {fields.map((field, index) => (
                            <Collapse.Panel
                                key={index}
                                collapsible={'header'}
                                header={`Раздел ${index+1}`}
                                extra={
                                    <Space wrap>
                                        <Button type={'primary'} icon={<PlusOutlined />} onClick={()=>showDrawer(index)}/>
                                        <Button icon={<SettingTwoTone/>}/>
                                        <Button
                                            type={'primary'}
                                            danger
                                            icon={
                                                <DeleteOutlined
                                                    onClick={() => remove(field.name)}
                                                />
                                            }/>
                                    </Space>
                                }
                            >
                                {testQuestionList?.map((item, index) => {
                                    if(item.chapterId === field.key) {
                                        return (
                                            <Card
                                                key={index}
                                                title={`Вопрос ${index+1}`}
                                                extra={
                                                    <DeleteTwoTone
                                                        twoToneColor={'#EB5757'}
                                                        onClick={() => dispatch(deleteElement(item))}
                                                    />
                                                }
                                                style={{marginBottom: '12px'}}
                                            >
                                                {item.name}
                                            </Card>
                                        )
                                    }
                                }
                                )}
                            </Collapse.Panel>
                        ))}
                    </Collapse>
                    <Button type={'primary'} onClick={add}>
                    Добавить раздел
                    </Button>
                    </>
                )}
            </Form.List>
        </div>
    )
}

export default ObrTestQuestions