import { Card, Checkbox, Form, Space, TimePicker, Select } from 'antd'
import { useState } from 'react'

import { useGetToolsDirectionQuery } from '../../../../../../services/ToolsService'

const { Option } = Select

const TestSoftParameters = () => {
    const [time, setTime] = useState(false)
    const [file, setFile] = useState(false)

    const { data: directionList, isLoading: isDirectionLoading } = useGetToolsDirectionQuery()

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

    if (isDirectionLoading) {
        return <div>asd</div>
    }

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
            <Form.Item
                label="Квалификация"
                name="direction"
                labelCol={{ span: 24 }}
                style={{ marginBottom: 20 }}
            >
                <Select mode="multiple" style={{ width: 220 }} placeholder="Квалификация">
                    {directionList?.map((item, index) => (
                        <Option value={item.id} key={index}>
                            {item.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item style={{ marginBottom: 10 }} name="time">
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
