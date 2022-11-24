import { Card, Checkbox, Form, Space, TimePicker } from 'antd'
import { useState } from 'react'

const TestSoftParameters = () => {
    const [time, setTime] = useState(false)
    const [file, setFile] = useState(false)

    const onTime = (time, timeString) => {
        console.log(time, timeString);
    };
    return (
        <Card
            hoverable={true}
            style={{marginBottom: '12px'}}
        >
            <Form.Item>
                <Space direction={'vertical'}>
                    <Checkbox onChange={() => setTime(!time)}>Ограничить время ответа на вопрос</Checkbox>
                    {time
                        ? (

                            <Space style={{marginLeft: '50px'}}>
                                <div>В секундах</div>
                                <TimePicker
                                    onChange={onTime}
                                    format={'ss'}
                                />
                            </Space>

                        )
                        : (null)
                    }
                    <Checkbox onChange={() => setFile(!file)}>Загрузка файла аттестуемым</Checkbox>
                </Space>
            </Form.Item>
        </Card>

    )
}

export default TestSoftParameters