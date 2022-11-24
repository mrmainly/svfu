import { Button, Card, Form } from 'antd'
import { DeleteTwoTone, SettingTwoTone } from '@ant-design/icons'
import { useState } from 'react'
import QuestionDrawer from './drawer'

import questions from './mock'
import './questions.css'
const ObrTestQuestions = () => {
    console.log(questions)
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
            <Form.List name={'questionss'} initialValue={[{}]}>
                {(fields, {add, remove}) => (
                    <div>
                        {fields.map(
                            (field, index) => (
                                <Card
                                    key={index}
                                    hoverable={true}
                                    title={`Вопрос ${index+1}`}
                                    extra={
                                        <DeleteTwoTone
                                            twoToneColor={'#EB5757'}
                                            onClick={() => remove(field.name)}
                                        />
                                    }
                                    style={{marginBottom: '12px'}}
                                >
                                    Вопрос
                                </Card>
                            )
                        )}
                        <Form.Item>
                            <Button
                                onClick={() => add()}
                            >
                                Добавить вопрос
                            </Button>
                        </Form.Item>
                    </div>
                )}
            </Form.List>
        </div>
    )
}

export default ObrTestQuestions