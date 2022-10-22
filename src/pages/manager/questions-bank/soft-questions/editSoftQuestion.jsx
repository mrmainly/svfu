/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { Input, Form, Select, Radio, Button, Typography, Upload, message } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'

import ConstructorVariantAnswer from './compoents/parts-question/ConstructorVariantAnswer'
import ScoringPoints from './compoents/parts-question/ScoringPoints'
import { MyButton } from '../../../../components'
import ConstructorTableQuestion from './compoents/parts-question/ConstructorTableQuestion'
import {
    useGetSoftQuestionIdQuery,
    usePatchConstructorSoftQuestionMutation,
} from '../../../../services/manager/question-bank/SoftQuestion'
import { useGetToolsDirectionQuery } from '../../../../services/ToolsService'
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

const EditSoftQuestion = () => {
    const location = useLocation()
    const state = location.state

    const { id } = state

    const [variantAnswerShow, setVariantAnswerShow] = useState(false)
    const [file, setFile] = useState('')
    const [showScoringPoints, setShowScoringPoints] = useState(false)
    const [showTableQuest, setShowTableQuest] = useState(false)

    const [patchConstructorSoft] = usePatchConstructorSoftQuestionMutation()
    const { data: diractionList } = useGetToolsDirectionQuery()
    const { data, isFetching } = useGetSoftQuestionIdQuery({ id: id })

    const navigate = useNavigate()

    useEffect(() => {
        setVariantAnswerShow(data?.variants ? true : false)
        setShowScoringPoints(data?.hint ? true : false)
        setShowTableQuest(data?.table_quest ? true : false)
    }, [data])

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
            setFile(file)
            const isPDF = file.type === 'application/pdf'

            if (!isPDF) {
                message.error(`${file.name} не является pdf файлом`)
                return isPDF || Upload.LIST_IGNORE
            }

            return false
        },
    }

    const onFinish = (data) => {
        const { table_quest, variants, hint, ...rest } = data
        patchConstructorSoft({
            body: {
                table_quest: table_quest ? table_quest : [],
                variants: variants ? variants : [],
                hint: hint ? hint : [],
                ...rest,
            },
            id: id,
        }).then((res) => {
            if (res.data) {
                message.success(`Вопрос номер ${id} изменен`)
                navigate(ROUTES.SOFT_QUESTIONS)
            } else {
                message.error('вопрос не изменен')
            }
        })
    }

    if (isFetching) {
        return <div>Loading</div>
    }

    return (
        <div>
            <Form
                layout="vertical"
                id="qbadd-form"
                style={{ display: 'flex', flexDirection: 'column', width: 500 }}
                onFinish={onFinish}
                initialValues={{
                    ['direction']: data.direction,
                    ['description']: data.description,
                    ['name']: data.name,
                    ['variants']: data?.variants,
                    ['hint']: data?.hint,
                    ['is_describe']: data.is_describe,
                    ['table_quest']: data?.table_quest,
                }}
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
                        {diractionList?.map((item, index) => (
                            <Option value={item.id} key={index}>
                                {item.name}
                            </Option>
                        ))}
                    </Select>
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
                    label="Описание"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Напишите описание',
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
                {variantAnswerShow ? (
                    <ConstructorVariantAnswer handleShowVariantAnswer={handleShowVariantAnswer} />
                ) : (
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
                    <Upload {...props} listType="picture-card" multiple={false} maxCount={1}>
                        {uploadButton}
                    </Upload>
                </Form.Item>
                <Form.Item label="Загрузка дакумента">
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

export default EditSoftQuestion
