// eslint-disable-next-line no-unused-vars
import { Button, Card, Collapse, Form, Space, Input } from 'antd'
import { DeleteTwoTone, PlusOutlined, SettingTwoTone, DeleteOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import QuestionDrawer from './drawer'
import questions from './mock'
import './questions.css'
import {ConstructorQuestionSlice} from '../../../../../../../reducers/ConstructorQuestionSlice'

const {Panel} = Collapse

const ObrTestQuestions = () => {

    const {deleteElement, initializationQuestionList, deleteChapter} = ConstructorQuestionSlice.actions
    const { testQuestionList } = useSelector(
        (state) => state.constructor_question_slice
    );

    const dispatch = useDispatch()

    const [open, setOpen] = useState(false)
    const [id, setId] = useState()
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
    console.log("testQuestionList", testQuestionList)
    return (
        <div className="card-container">
            <QuestionDrawer open={open} onClose={onClose} chapterId={id}/>
            <Form.List name={'chapters'}>
                {(fields, {add, remove}) => (
                    <>
                        <Collapse ghost={true}>
                            {fields.map((field, index) => (
                                <Panel
                                    key={index}
                                    collapsible={'header'}
                                    header={
                                        <Form.Item
                                            name={[field.name, 'name']}
                                        >
                                            <Input placeholder={`Раздел ${index+1}`} bordered={false} style={{backgroundColor: '#f5f5f5', color: 'black'}}/>
                                        </Form.Item>
                                    }
                                    extra={
                                        <Space wrap>
                                            <Button type={'primary'} icon={<PlusOutlined />} onClick={()=>showDrawer(field.key)}/>
                                            <Button icon={<SettingTwoTone/>}/>
                                            <Button
                                                type={'primary'}
                                                danger
                                                icon={
                                                    <DeleteOutlined
                                                        onClick={() => (
                                                            remove(field.name),
                                                            dispatch(deleteChapter(field.key))
                                                        )}
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
                                                    <Form.Item
                                                        name={[field.name, 'question', index]}
                                                        hidden={true}
                                                    >
                                                        <input value={'fsafas'}/>
                                                    </Form.Item>
                                                    {item.name}
                                                </Card>
                                            )
                                        }
                                    })}
                                </Panel>
                            ))}
                        </Collapse>
                        <Button type={'primary'} onClick={()=>add()}>
                            Добавить раздел
                        </Button>
                    </>
                )}
            </Form.List>
        </div>
    )
}

export default ObrTestQuestions