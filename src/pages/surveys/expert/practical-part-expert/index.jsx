import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Typography, Input, Form, Spin, Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { useTimer } from 'use-timer'

import {
    useGetPracticalPartIdQuery,
    usePracticalPartPostMutation,
} from '../../../../services/SurveysService'
import { MyButton } from '../../../../components'
import ROUTES from '../../../../routes'

const { Text, Title } = Typography
const { Dragger } = Upload
const { TextArea } = Input

const PracticalPartExpert = () => {
    const location = useLocation()
    const state = location.state
    const { id } = state

    const { data: practical_data, isLoading } = useGetPracticalPartIdQuery({ id: id })
    const [postPracticalPart] = usePracticalPartPostMutation()

    const navigate = useNavigate()

    if (isLoading) {
        return <Spin />
    }

    console.log(practical_data)

    const onSubmitFurther = (data) => {
        console.log(data)
        let formData = new FormData()
        formData.append('file', data.file.file.originFileObj)
        formData.append('q_id', practical_data.surveyquest[0].id)
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
            <Form style={{ display: 'flex', flexDirection: 'column' }} onFinish={onSubmitFurther}>
                {practical_data.surveyquest.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            flexDirection: 'column',
                        }}
                    >
                        <Title level={4}>Практический вопрос</Title>
                        <Text style={{ marginTop: 12 }}>{item.question.description}</Text>
                        <Form.Item
                            name="describe"
                            labelCol={{ span: 24 }}
                            label={<Text style={{ fontSize: 16 }}>Ответ:</Text>}
                            style={{ marginTop: 20 }}
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
                <MyButton htmlType="submit">Завершить тест</MyButton>
            </Form>
        </div>
    )
}

export default PracticalPartExpert
