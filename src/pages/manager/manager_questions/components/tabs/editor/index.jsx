import { SettingTwoTone } from '@ant-design/icons'
import { Button, Card, Form } from 'antd'
import { useState } from 'react'
import ReactSummernote from 'react-summernote'
import { useSelector } from 'react-redux'

import {
    OneChoiseQuestionType,
    MultipleChoiseQuestionType,
    DescribeQuestionType,
} from './question_types'
import ScoringPoints from './scoring_points'
import MyDrawer from '../../drawer'
import './soft.css'

const TestSoftEditor = () => {
    const [open, setOpen] = useState(false)

    const { questionType, technique } = useSelector((state) => state.constructor_question_slice)

    const showDrawer = () => {
        setOpen(true)
    }
    const onClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <Button
                type={'primary'}
                onClick={showDrawer}
                className="floatButton"
                shape="circle"
                icon={<SettingTwoTone className="icon" />}
            />
            <MyDrawer open={open} onClose={onClose} />

            <Card hoverable={false} title={`Задание и описание вопроса`} className="card">
                <Form.Item
                    rules={[
                        {
                            required: true,
                            message: 'Задание и описание вопроса является обязательным полем',
                        },
                    ]}
                    name="description"
                    style={{ marginBottom: 0 }}
                >
                    <ReactSummernote
                        value="Default value"
                        options={{
                            lang: 'ru-RU',
                            height: 250,
                            dialogsInBody: true,
                            toolbar: [
                                ['style', ['bold', 'italic', 'underline', 'clear']],
                                ['font', ['strikethrough', 'superscript', 'subscript']],
                                ['fontsize', ['fontsize']],
                                ['para', ['ul', 'ol', 'paragraph']],
                                ['table', ['table']],
                                ['insert', ['link', 'picture']],
                                ['view', ['codeview']],
                            ],
                        }}
                    />
                </Form.Item>
            </Card>
            {technique === 'DESCRIBE' && <DescribeQuestionType />}
            {technique === 'ONE_CHOICE' && <OneChoiseQuestionType />}
            {technique === 'MULTIPLE_CHOICE' && <MultipleChoiseQuestionType />}
            {questionType === 'SOFT' && <ScoringPoints />}
        </div>
    )
}

export default TestSoftEditor
