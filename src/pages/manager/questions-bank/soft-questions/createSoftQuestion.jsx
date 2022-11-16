/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Input, Form, Select, Radio, Button, Typography, Upload, message } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

import ConstructorVariantAnswer from './compoents/parts-question/ConstructorVariantAnswer'
import ScoringPoints from './compoents/parts-question/ScoringPoints'
import { MyButton } from '../../../../components'
import ConstructorTableQuestion from './compoents/parts-question/ConstructorTableQuestion'
import { usePostConstructorSoftQuestionMutation } from '../../../../services/manager/question-bank/SoftQuestion'
import { useGetToolsDirectionQuery } from '../../../../services/ToolsService'
import {
    usePostConstructorQuestionFileMutation,
    usePostConstructorQuestionImageMutation,
} from '../../../../services/manager/question-bank'
import ROUTES from '../../../../routes'

const { Option } = Select
const { TextArea } = Input

const { Text } = Typography

const props = {
    beforeUpload: (file) => {
        const isPNG = file.type === 'image/png' || file.type === 'image/jpeg'

        if (!isPNG) {
            message.error(`${file.name} не является PNG/JPEG файлом`)
            return isPNG || Upload.LIST_IGNORE
        }

        return false
    },
}

const uploadButton = (
    <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
    </div>
)

const CreateSoftQuestion = () => {
    const [variantAnswerShow, setVariantAnswerShow] = useState(false)
    const [file, setFile] = useState('')
    const [showScoringPoints, setShowScoringPoints] = useState(false)
    const [showTableQuest, setShowTableQuest] = useState(false)

    const [postConstructorSoftQuestion] = usePostConstructorSoftQuestionMutation()
    const [postConstructorQuestionImage] = usePostConstructorQuestionImageMutation()
    const [postConstructorQuestionFile] = usePostConstructorQuestionFileMutation()
    const { data } = useGetToolsDirectionQuery()

    const navigate = useNavigate()

    const handleShowVariantAnswer = () => {
        setVariantAnswerShow(!variantAnswerShow)
    }

    const handleShowScoringPoints = () => {
        setShowScoringPoints(!showScoringPoints)
    }

    const handleShowTableQuestion = () => {
        setShowTableQuest(!showTableQuest)
    }

    const props = {
        beforeUpload: (file) => {
            const isPDF = file.type === 'application/pdf'

            if (!isPDF) {
                message.error(`${file.name} не является pdf файлом`)
                return isPDF || Upload.LIST_IGNORE
            } else {
                setFile(file)
            }

            return false
        },
    }

    const props2 = {
        beforeUpload: (file) => {
            const isPNG = file.type === 'image/png' || file.type === 'image/jpeg'

            if (!isPNG) {
                message.error(`${file.name} не является PNG/JPEG файлом`)
                return isPNG || Upload.LIST_IGNORE
            }

            return false
        },
    }

    const onFinish = (data) => {
        const { img, ...rest } = data

        postConstructorSoftQuestion({
            body: { ...rest },
        }).then((res) => {
            if (res.data) {
                message.success('Вопрос создан')
                navigate(ROUTES.SOFT_QUESTIONS)
                if (data.img) {
                    const formData = new FormData()
                    formData.append('image', img?.file)
                    formData.append('question_soft_id', res.data.question_id)
                    postConstructorQuestionImage({
                        formData: formData,
                    }).then((res) => {
                        if (res.error) {
                            message.error('Фотография не корректно загружено')
                        }
                    })
                }
                if (file != '') {
                    const formData = new FormData()
                    formData.append('file', file)
                    formData.append('question_soft_id', res.data.question_id)
                    postConstructorQuestionFile({ formData: formData }).then(() => {
                        if (rest.error) {
                            message.error('Файл не корректно загружен')
                        }
                    })
                }
            } else {
                message.error('вопрос не создан')
            }
        })
    }

    return (
        <div>
            <Form
                layout="vertical"
                id="qbadd-form"
                style={{ display: 'flex', flexDirection: 'column', width: 500 }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="Квалификация вопроса"
                    name="direction"
                    rules={[
                        {
                            required: true,
                            message: 'Выберите квалификацию',
                        },
                    ]}
                >
                    <Select mode="multiple">
                        {data?.map((item, index) => (
                            <Option value={item.id} key={index}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Описание"
                    name="description"
                >
                    <TextArea />
                </Form.Item>
                <Form.Item
                    label="Задание"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Напишите задание',
                        },
                    ]}
                >
                    <TextArea />
                </Form.Item>
                <Form.Item
                    label="Добавить открытый ответ"
                    name="is_describe"
                    rules={[
                        {
                            required: true,
                            message: 'Напишите описание',
                        },
                    ]}
                >
                    <Radio.Group>
                        <Radio value={true}>Да</Radio>
                        <Radio value={false}>Нет</Radio>
                    </Radio.Group>
                </Form.Item>
                <Text style={{ marginBottom: 10 }}>Варианты ответа</Text>
                {!variantAnswerShow ? (
                    <Button
                        block
                        type="primary"
                        ghost
                        style={{ width: 'max-content' }}
                        onClick={handleShowVariantAnswer}
                        disabled={showTableQuest}
                    >
                        Добавить варианты ответа
                    </Button>
                ) : (
                    <ConstructorVariantAnswer handleShowVariantAnswer={handleShowVariantAnswer} />
                )}
                <Text style={{ marginBottom: 10, marginTop: 25 }}>Добавить TableQuest</Text>
                {!showTableQuest ? (
                    <Button
                        block
                        type="primary"
                        ghost
                        style={{ width: 'max-content' }}
                        disabled={variantAnswerShow}
                        onClick={handleShowTableQuestion}
                    >
                        Добавить tableQuest
                    </Button>
                ) : (
                    <ConstructorTableQuestion handleShowTableQuestion={handleShowTableQuestion} />
                )}

                <Form.Item label="Изображение" name="img" style={{ marginTop: 25 }}>
                    <Upload
                        {...props2}
                        listType="picture-card"
                        multiple={false}
                        maxCount={1}
                        accept=".jpg,.jpeg,.png"
                    >
                        {uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item label="Загрузка документа">
                    <Upload
                        action="none"
                        {...props}
                        name="passport"
                        multiple={false}
                        maxCount={1}
                        labelCol={{ span: 24 }}
                        accept=".pdf"
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item label="Выставление баллов">
                    {!showScoringPoints ? (
                        <Button
                            block
                            type="primary"
                            ghost
                            style={{ width: 'max-content' }}
                            onClick={handleShowScoringPoints}
                        >
                            Выставить баллы
                        </Button>
                    ) : (
                        <ScoringPoints handleShowScoringPoints={handleShowScoringPoints} />
                    )}
                </Form.Item>

                <MyButton htmlType="submit">Сохранить</MyButton>
            </Form>
        </div>
    )
}

export default CreateSoftQuestion
