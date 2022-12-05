// eslint-disable-next-line no-unused-vars
import { Button, Card, Collapse, Form, Space, Input, Modal, List, InputNumber } from 'antd'
import { DeleteTwoTone, PlusOutlined, SettingTwoTone, DeleteOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import QuestionDrawer from './drawer'
import './questions.css'
import {ConstructorQuestionSlice} from '../../../../../../../../reducers/ConstructorQuestionSlice'
import {useGetConstructorTestCreateQuestionsQuery} from '../../../../../../../../services/manager/TestsBank'
import QuestionSettingModal from './modal'

const {Panel} = Collapse

const ObrTestQuestions = () => {
    const {data, isLoading} = useGetConstructorTestCreateQuestionsQuery()
    console.log(data)

    const {deleteElement, initializationQuestionList, deleteChapter} = ConstructorQuestionSlice.actions
    const { testQuestionList } = useSelector(
        (state) => state.constructor_question_slice
    );

    const dispatch = useDispatch()

    const [isOpenDrawer, setIsOpenDrawe] = useState(false)
    const [openQuestionModalId, setOpenQuestionModalId] = useState(-1)
    const [id, setId] = useState()
    const showDrawer = (index) => {
        setIsOpenDrawe(true)
        setId(index)
    }
    const onClose = () => {
        setIsOpenDrawe(false)
    }
    useEffect(() => {
            dispatch(initializationQuestionList(data?.results))
    },[data])

    if(isLoading) {
      return <div>dsadasd</div>
    }
    return (
        <div className="card-container">
            <QuestionDrawer open={isOpenDrawer} onClose={onClose} chapterId={id}/>

            <Form.List name={'chapters'} initialValue={[{}]}>
                {(fields, {add, remove}) => (
                    <>
                        {fields.map((field, index) => (
                            <Collapse ghost={true} key={index} >
                                <Panel
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
                                            <Button icon={<SettingTwoTone/>} onClick={() => setOpenQuestionModalId(field.key)}/>
                                            <Button
                                                type={'primary'}
                                                   danger
                                                   icon={
                                                       <DeleteOutlined
                                                           onClick={() => {
                                                               remove(field.name)
                                                               dispatch(deleteChapter(field.key))
                                                           }}
                                                       />
                                                   }/>
                                            <QuestionSettingModal key={field.key} visible={openQuestionModalId} onCancel={setOpenQuestionModalId} field={field}/>
                                        </Space>
                                    }
                                >
                                    {testQuestionList?.map((item, index) =>
                                        (item.chapterId === field.key &&
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
                                                {item.description}
                                            </Card>
                                        )
                                    )}
                                </Panel>
                            </Collapse>
                        ))}
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