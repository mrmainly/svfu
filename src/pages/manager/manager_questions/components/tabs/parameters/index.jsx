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
            label: 'DESCRIBE',
            value: 'DESCRIBE',
        },
    ]

    return (
        <Card>
            <Form.Item
                label="Сложность задания"
                labelCol={{ span: 24 }}
                style={{ marginBottom: 10 }}
            >
                <Select style={{ width: 220 }} defaultValue="BEGINNER">
                    {difficulty.map((item, index) => (
                        <Option key={index}>{item.label}</Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Квалификация" labelCol={{ span: 24 }} style={{ marginBottom: 20 }}>
                <Select style={{ width: 220 }} defaultValue="BEGINNER">
                    {difficulty.map((item, index) => (
                        <Option key={index}>{item.label}</Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item style={{ marginBottom: 10 }}>
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
            <Form.Item style={{ marginBottom: 0 }}>
                <Checkbox onChange={() => setFile(!file)}>Загрузка файла аттестуемым</Checkbox>
            </Form.Item>
        </Card>
    )
}

export default TestSoftParameters
