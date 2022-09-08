import React from 'react'
import { Form, Input, message, Typography } from 'antd'

import { MyButton, Line } from '../../components'
import { usePostQualificationMutation } from '../../services/QualificationsService'

const { Text } = Typography

const QualificationAdded = () => {
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
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('date_of_issue', data.date_of_issue)
        formData.append('date_start', data.date_start)
        formData.append('date_finish', data.date_finish)
        formData.append('file', document.getElementById('file').files[0], data.file)

        console.log('asda')

        postQualification({ formData: formData }).then((res) => {
            if (res.data) {
                message.success('Документ изменен')
            } else {
                message.error(`${res.error.data.errors[0]}`)
            }
        })
    }
    return (
        <div>
            <Form onFinish={(inputs) => onSubmit(inputs)}>
                {inputs.map((item, index) => (
                    <Form.Item
                        key={index}
                        label={<Text style={{ fontWeight: 600, fontSize: 16 }}>{item.title}</Text>}
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
                <Line />
                <MyButton>Загрузить</MyButton>
            </Form>
        </div>
    )
}

export default QualificationAdded
