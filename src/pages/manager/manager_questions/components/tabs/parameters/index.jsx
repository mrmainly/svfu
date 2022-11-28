import { Card, Checkbox, Form, Space, TimePicker, Select } from 'antd'
import { useState } from 'react'

const { Option } = Select

const TestSoftParameters = () => {
    const [time, setTime] = useState(false)
    const [file, setFile] = useState(false)

    const onTime = (time, timeString) => {
        console.log(time, timeString)
    }

    const difficulty = [
        {
            label: 'BEGINNER',
            value: 'BEGINNER',
        },
        {
            label: 'ADVANCED',
            value: 'ADVANCED',
        },
        {
            label: 'EXPERT',
            value: 'EXPERT',
        },
        {
            label: 'DESCRIBE ',
            value: 'DESCRIBE ',
        },
    ]

    return (
        <Card style={{ marginBottom: '12px' }}>
            <Form.Item>
                <Space direction={'vertical'}>
                    <Checkbox onChange={() => setTime(!time)}>
                        Ограничить время ответа на вопрос
                    </Checkbox>
                    {time && (
                        <Space style={{ marginLeft: '50px' }}>
                            <div>В секундах</div>
                            <TimePicker onChange={onTime} format={'ss'} />
                        </Space>
                    )}
                </Space>
            </Form.Item>
            <Form.Item>
                <Checkbox onChange={() => setFile(!file)}>Загрузка файла аттестуемым</Checkbox>
            </Form.Item>

            <Form.Item label="Сложность задания" labelCol={{ span: 24 }}>
                <Select style={{ width: 220 }} defaultValue="BEGINNER">
                    {difficulty.map((item, index) => (
                        <Option key={index}>{item.label}</Option>
                    ))}
                </Select>
            </Form.Item>
        </Card>
    )
}

export default TestSoftParameters
