import { useState } from 'react'

import { Modal, Form, Input, message, Typography, DatePicker, Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

import { MyButton } from '../../../../components'
import { usePostQualificationMutation } from '../../../../services/documents/Qualifications'

const { Text } = Typography
const { RangePicker } = DatePicker

const MQAddModal = ({ open, setOpen }) => {
    const [file, setFile] = useState()

    const [postQualification] = usePostQualificationMutation()
    const inputs = [
        {
            title: 'Название квалификации:',
            name: 'name',
            text: 'Введите название квалификации',
            type: 'text',
        },
        {
            title: 'Дата выдачи документа:',
            name: 'date_of_issue',
            text: 'Введите дату выдачу документа',
            type: 'date',
        },
        {
            title: 'Выберите файл',
            name: 'file',
            text: 'Выберите файл',
            type: 'file',
        },
    ]

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
    const onSubmit = (data) => {
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('date_of_issue', data.date_of_issue)
        formData.append('file', file)

        postQualification({ formData: formData }).then((res) => {
            if (res.data) {
                message.success('Квалификация добавлена')
                setOpen(false)
            } else {
                message.error(`${res.error.data.errors[0]}`)
            }
        })
    }

    return (
        <div>
            <Modal
                destroyOnClose={true}
                title="Добавление квалификации"
                visible={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={[
                    <MyButton key="submit" htmlType="submit" form="aq-form">
                        Сохранить
                    </MyButton>,
                    <MyButton
                        key="back"
                        type="default"
                        style={{
                            background: '#FFF',
                        }}
                        onClick={() => setOpen(false)}
                    >
                        Отмена
                    </MyButton>,
                ]}
            >
                <Form onFinish={(inputs) => onSubmit(inputs)} id="aq-form">
                    {inputs.map((item, index) => (
                        <Form.Item
                            key={index}
                            label={
                                <Text style={{ fontWeight: 600, fontSize: 16 }}>{item.title}</Text>
                            }
                            name={item.name}
                            required
                            rules={[
                                {
                                    required: true,
                                    message: item.text,
                                },
                            ]}
                            labelCol={{ span: 24 }}
                            style={{ width: 350 }}
                        >
                            {item.type === 'range-picker' ? (
                                <RangePicker
                                    format="YYYY-MM-DD"
                                    size="large"
                                    style={{ width: '100%' }}
                                />
                            ) : item.type === 'file' ? (
                                <Upload
                                    action="none"
                                    {...props}
                                    name="passport"
                                    multiple={false}
                                    maxCount={1}
                                    labelCol={{ span: 24 }}
                                    accept=".pdf"
                                >
                                    <Button icon={<UploadOutlined />}>Загрузить документ</Button>
                                </Upload>
                            ) : (
                                <Input
                                    placeholder={item.text}
                                    size="large"
                                    type={item.type}
                                    accept=".pdf"
                                />
                            )}
                        </Form.Item>
                    ))}
                </Form>
            </Modal>
        </div>
    )
}

MQAddModal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
}

export default MQAddModal
