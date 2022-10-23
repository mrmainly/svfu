/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useState, useEffect } from 'react'
import { Input, Form, Select, Radio, Button, Typography, Upload, message, Spin } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'

import ConstructorVariantAnswer from './compoents/parts-question/ConstructorVariantAnswer'
import ScoringPoints from './compoents/parts-question/ScoringPoints'
import { MyButton } from '../../../../components'
import ConstructorTableQuestion from './compoents/parts-question/ConstructorTableQuestion'
import {
    useGetSoftQuestionIdQuery,
    usePatchConstructorSoftQuestionMutation,
    usePatchQuestionSoftFileMutation,
} from '../../../../services/manager/question-bank/SoftQuestion'
import {
    usePatchConstructorQuestionIdImageMutation,
    useDeleteConstructorQuestionIdImageMutation,
    usePostConstructorQuestionImageMutation,
    usePostConstructorQuestionFileMutation,
    useDeleteConstructorQuestionIdFileMutation,
} from '../../../../services/manager/question-bank'
import { useGetToolsDirectionQuery } from '../../../../services/ToolsService'
import ROUTES from '../../../../routes'

const { Option } = Select
const { TextArea } = Input

const { Text } = Typography

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
    // eslint-disable-next-line no-unused-vars
    const [file, setFile] = useState('')
    const [showScoringPoints, setShowScoringPoints] = useState(false)
    const [showTableQuest, setShowTableQuest] = useState(false)
    const [img, setImg] = useState(null)

    const [patchConstructorSoft] = usePatchConstructorSoftQuestionMutation()
    const [patchConstructorQuestionIdImage] = usePatchConstructorQuestionIdImageMutation()
    const [postConstructorQuestionImage] = usePostConstructorQuestionImageMutation()
    const [deleteImage] = useDeleteConstructorQuestionIdImageMutation()
    const [patchQuestionSoftFile] = usePatchQuestionSoftFileMutation()
    const [postConstructorQuestionFile] = usePostConstructorQuestionFileMutation()
    const [deleteFile] = useDeleteConstructorQuestionIdFileMutation()

    const { data: diractionList } = useGetToolsDirectionQuery()
    const { data, isFetching } = useGetSoftQuestionIdQuery({ id: id })

    const navigate = useNavigate()

    useEffect(() => {
        setVariantAnswerShow(data?.variants ? true : false)
        setShowScoringPoints(data?.hint ? true : false)
        setShowTableQuest(data?.table_quest ? true : false)
        setImg(data?.question_images?.length === 0 ? null : data?.question_images[0].image)
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
    const propsImg = {
        beforeUpload: (file) => {
            setImg(file)
            const isPNG = file.type === 'image/png' || file.type === 'image/jpeg'

            if (!isPNG) {
                message.error(`${file.name} не является PNG/JPEG файлом`)
                return isPNG || Upload.LIST_IGNORE
            }

            return false
        },
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

    const defualtImgList = [
        {
            uid: '-1',
            name: img || data?.question_images[0]?.image,
            status: 'done',
            url: img || data?.question_images[0]?.image,
        },
    ]
    const defualtFileList = [
        {
            uid: '-1',
            name: file != '' || data?.question_files[0]?.file,
            status: 'done',
            url: file != '' || data?.question_files[0]?.file,
        },
    ]

    console.log(data)

    if (isFetching) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: 150,
                    height: '100rem',
                }}
            >
                <Spin />
            </div>
        )
    }

    const onFinish = (formSoftData) => {
        const { table_quest, variants, hint, image, ...rest } = formSoftData
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
                if (typeof img === 'object' && data?.question_images[0]?.image) {
                    const formData = new FormData()
                    formData.append('image', img)

                    patchConstructorQuestionIdImage({
                        id: data?.question_images[0].id,
                        formData: formData,
                    }).then((res) => {
                        if (res.error) {
                            message.error('Фотография не корректно загружено')
                        }
                    })
                } else if (data?.question_images?.length === 0 && img !== null) {
                    const formData = new FormData()
                    formData.append('image', img)
                    formData.append('question_soft_id', data.id)
                    postConstructorQuestionImage({
                        formData: formData,
                    }).then((res) => {
                        if (res.error) {
                            message.error('Фотография не корректно загружено')
                        }
                    })
                } else if (data?.question_images[0]?.image && typeof img !== 'string') {
                    deleteImage(data?.question_images[0].id)
                }
                if (typeof file === 'object' && data?.question_files[0]?.file) {
                    const formData = new FormData()
                    formData.append('file', file)
                    patchQuestionSoftFile({
                        formData: formData,
                        id: data?.question_files[0].id,
                    }).then((res) => {
                        console.log('resdsa', res)
                    })
                } else if (file !== '' && data?.question_files?.length === 0) {
                    const formData = new FormData()
                    formData.append('file', file)
                    formData.append('question_soft_id', data.id)
                    postConstructorQuestionFile({ formData: formData }).then(() => {
                        if (rest.error) {
                            message.error('Файл не корректно загружен')
                        }
                    })
                } else if (data?.question_files[0]?.file && typeof file == 'string') {
                    deleteFile(data?.question_files[0].id)
                }
            } else {
                message.error('вопрос не изменен')
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
                    <Upload
                        {...propsImg}
                        listType="picture-card"
                        multiple={false}
                        maxCount={1}
                        onRemove={() => setImg()}
                        defaultFileList={
                            data?.question_images?.length === 0 ? null : defualtImgList
                        }
                    >
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
                        defaultFileList={
                            data?.question_files?.length === 0 ? null : defualtFileList
                        }
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
