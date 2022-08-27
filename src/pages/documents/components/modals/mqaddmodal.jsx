import { useState, useRef } from 'react'
import { Modal, Form, Input, message, Typography, Button, Upload } from 'antd'

import { FileTwoTone, EditOutlined, UploadOutlined } from '@ant-design/icons'

import Item from 'antd/lib/list/Item'

import { MyButton } from '../../../../components'
import { usePostQualificationMutation } from '../../../../services/QualificationsService'

const { TextArea } = Input
const { Text } = Typography

const MQAddModal = ({ open, setOpen }) => {
    const [postQualification] = usePostQualificationMutation()
    const inputs = [
        {
            title: 'Название квалификации:',
            name: 'name',
            text: 'Введите номер квалификации',
        },
        {
            title: 'Дата выдачи документа:',
            name: 'date_of_issue',
            text: 'Введите дату выдачу документа',
            type: 'date',
        },
        {
            title: 'Дата выдачи документа:',
            name: 'date_start',
            text: 'Введите дату выдачи документа',
            type: 'date',
        },
        {
            title: 'Срок действия',
            name: 'date_finish',
            text: 'Введите срок действия',
            type: 'date',
        },
        {
            title: 'Выберите файл',
            name: 'file',
            text: 'Выберите файл',
            type: 'file',
        },
    ]
    const onSubmit = (data) => {
        let formData = new FormData()
        formData.append('name', data.name)
        formData.append('date_of_issue', data.date_of_issue)
        formData.append('date_start', data.date_start)
        formData.append('date_finish', data.date_finish)
        formData.append('file', document.getElementById('file').files[0], data.file)

        postQualification({ formData: formData }).then((res) => {
            if (res.data) {
                message.success('Документ изменен')
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
                title="Создание квалификации"
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
                            <Input placeholder={item.text} size="large" type={item.type} />
                        </Form.Item>
                    ))}
                </Form>
            </Modal>
        </div>
    )
}

export default MQAddModal
