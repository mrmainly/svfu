import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Typography, Input, Form, Spin, Upload, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

import {
    useGetPracticalPartIdQuery,
    usePostPracticalPartMutation,
} from '../../../../../services/TesterService'
import ROUTES from '../../../../../routes'

const { Text, Title } = Typography
const { Dragger } = Upload
const { TextArea } = Input

const PracticalPart = ({ id }) => {
    const { data: practical_data, isLoading } = useGetPracticalPartIdQuery({ id: id })
    const [postPracticalPart] = usePostPracticalPartMutation()

    const navigate = useNavigate()

    if (isLoading) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 600,
                }}
            >
                <Spin />
            </div>
        )
    }

    const onSubmitFurther = (data) => {
        const formData = new FormData()
        if (data.file) {
            formData.append('file', data.file.file)
        }

        formData.append(
            'q_id',
            practical_data?.surveyquest[0]?.question.id
                ? practical_data?.surveyquest[0]?.question.id
                : 1
        )
        formData.append('describe', data.describe ? data.describe : '')
        postPracticalPart({
            id: id,
            body: formData,
        }).then((res) => {
            if (res.data) {
                navigate(ROUTES.AVAILABLE_TESTS)
                message.success('Мы отправим вам результаты в ближайшее время')
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
                {practical_data.surveyquest.length
                    ? practical_data.surveyquest.map((item, index) => (
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
                                      style={{
                                          display: 'flex',
                                          flexDirection: 'column',
                                          marginTop: 10,
                                      }}
                                  >
                                      <Text>Прикрепленныe файлы:</Text>
                                      <div style={{ display: 'flex', marginTop: 10 }}>
                                          {item.question.question_files.map((itemFile, index) => (
                                              <a
                                                  href={itemFile.file}
                                                  target="_blank"
                                                  key={index}
                                                  style={{ marginLeft: index === 0 ? 0 : 10 }}
                                                  rel="noopener noreferrer"
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
                                  <Dragger beforeUpload={true} maxCount={1}>
                                      <p className="ant-upload-drag-icon">
                                          <InboxOutlined />
                                      </p>
                                      <p className="ant-upload-text">
                                          Нажмите или перетащите файл в эту область для загрузки
                                      </p>
                                      <p className="ant-upload-hint">
                                          Support for a single or bulk upload. Strictly prohibit
                                          from uploading company data or other band files
                                      </p>
                                  </Dragger>
                              </Form.Item>
                          </div>
                      ))
                    : 'Нету практической части'}
            </Form>
        </div>
    )
}

PracticalPart.propTypes = {
    id: PropTypes.number,
}

export default PracticalPart
