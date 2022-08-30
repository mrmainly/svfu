import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Typography, Input, Form, Spin, Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'

import {
    useGetPracticalPartIdQuery,
    usePracticalPartPostMutation,
} from '../../../../services/SurveysService'
import ROUTES from '../../../../routes'

const { Text, Title } = Typography
const { Dragger } = Upload
const { TextArea } = Input

const PracticalPart = () => {
    const location = useLocation()
    const state = location.state
    const { id } = state

    const { data: practical_data, isLoading } = useGetPracticalPartIdQuery({ id: id })
    const [postPracticalPart] = usePracticalPartPostMutation()

    const navigate = useNavigate()

    console.log(practical_data)

    if (isLoading) {
        return <Spin />
    }

    const onSubmitFurther = (data) => {
        console.log(data)
        let formData = new FormData()
        if (data.file) {
            formData.append('file', data.file.file.originFileObj)
        }
        formData.append('q_id', practical_data.surveyquest[0].question.id)
        formData.append('describe', data.describe)
        postPracticalPart({
            id: id,
            body: formData,
        }).then((res) => {
            if (res.data) {
                navigate(ROUTES.PROFILE)
            } else {
                message.error('что то пошло не так')
            }
        })
    }

    return (
        <div>
            <Form
                style={{ display: 'flex', flexDirection: 'column' }}
                onFinish={onSubmitFurther}
                id="form-practical-part"
            >
                {practical_data.surveyquest.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Title level={4}>Практический вопрос</Title>
                        <Text style={{ marginTop: 12 }}>{item.question.description}</Text>

                        {item?.question?.question_images.length && (
                            <div style={{ display: 'flex', flexDirection: ' column' }}>
                                {item?.question?.question_images.map((itemImage, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            height: 150,
                                            objectFit: 'cover',
                                            marginTop: 20,
                                            background: `url(${itemImage.image})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: 'contain',
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                        {item.question?.question_files?.length && (
                            <div
                                style={{ display: 'flex', flexDirection: 'column', marginTop: 10 }}
                            >
                                <Text>Прикрепленныe файлы:</Text>
                                <div style={{ display: 'flex', marginTop: 10 }}>
                                    {item.question.question_files.map((itemFile, index) => (
                                        <a
                                            href={itemFile.file}
                                            target="_blank"
                                            key={index}
                                            style={{ marginLeft: index === 0 ? 0 : 10 }}
                                        >
                                            {decodeURI(itemFile.file).split('/')[5]}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                        <Form.Item
                            name="describe"
                            labelCol={{ span: 24 }}
                            label={<Text style={{ fontSize: 16 }}>Ответ:</Text>}
                            style={{ marginTop: 10 }}
                            required
                        >
                            <TextArea style={{ height: 134 }} />
                        </Form.Item>
                        <Form.Item
                            label={<Text style={{ fontSize: 16 }}>Загрузить файл:</Text>}
                            style={{ marginTop: 20 }}
                            labelCol={{ span: 24 }}
                            name="file"
                        >
                            <Dragger>
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">
                                    Click or drag file to this area to upload
                                </p>
                                <p className="ant-upload-hint">
                                    Support for a single or bulk upload. Strictly prohibit from
                                    uploading company data or other band files
                                </p>
                            </Dragger>
                        </Form.Item>
                    </div>
                ))}
            </Form>
        </div>
    )
}

export default PracticalPart
