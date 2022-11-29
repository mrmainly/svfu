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
    const [question, setQuestion] = useState('')
    const [open, setOpen] = useState(false)

    const { questionType } = useSelector((state) => state.constructor_question_slice)

    const showDrawer = () => {
        setOpen(true)
    }
    const onClose = () => {
        setOpen(false)
    }
    const onChange = (content) => {
        console.log('onChange', content)
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
            <MyDrawer open={open} onClose={onClose} setQuestion={setQuestion} />

            <Card hoverable={false} title={`Задание и описание вопроса`} className="card">
                <Form.Item style={{ marginBottom: '-1px' }}>
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
                        onChange={(content) => onChange(content)}
                    />
                </Form.Item>
            </Card>
            {/* <Card style={{ marginBottom: 12 }}>
                <Form.Item>
                    <Upload
                        // {...props}
                        multiple={false}
                        maxCount={1}
                        accept=".pdf"
                    >
                        <Button icon={<UploadOutlined />}>Загрузить фотографию</Button>
                    </Upload>
                </Form.Item>
            </Card> */}
            {question === 'Ответ в свободной форме' && <DescribeQuestionType />}
            {question === 'Ответ в свободной форме(практическая часть)' && <DescribeQuestionType />}
            {question === 'Одиночный выбор' && <OneChoiseQuestionType />}
            {question === 'Множественный выбор' && <MultipleChoiseQuestionType />}
            {questionType === 'SOFT' && <ScoringPoints />}
        </div>
    )
}

export default TestSoftEditor
