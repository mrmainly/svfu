// eslint-disable-next-line no-unused-vars
import { Button, Card } from 'antd'
import { DeleteTwoTone, SettingTwoTone } from '@ant-design/icons'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import QuestionDrawer from './drawer'
import questions from './mock'
import './questions.css'
import {ConstructorQuestionSlice} from '../../../../../../../reducers/ConstructorQuestionSlice'

const ObrTestQuestions = () => {
    const {deleteElement} = ConstructorQuestionSlice.actions
    const { questionList } = useSelector(
        (state) => state.constructor_question_slice
    );

    const dispatch = useDispatch()

    console.log(questionList)
    const [open, setOpen] = useState(false)
    const showDrawer = () => {
        setOpen(true)
    }
    const onClose = () => {
        setOpen(false)
    }
    return (
        <div>
            <Button
                type={"primary"}
                onClick={showDrawer}
                className='floatButton'
                shape="circle"
                icon={ <SettingTwoTone className="icon" />}
            />
            <QuestionDrawer open={open} onClose={onClose} data={questions}/>
            {questionList?.map((item, index) => (
                <Card
                    key={index}
                    hoverable={true}
                    title={`Вопрос ${index+1}`}
                    extra={
                        <DeleteTwoTone
                            twoToneColor={'#EB5757'}
                            onClick={() => dispatch(deleteElement(index))}
                        />
                    }
                    style={{marginBottom: '12px'}}
                >
                    {item.title}
                </Card>
            ))}
        </div>
    )
}

export default ObrTestQuestions