import { Card, Form, Space, Switch } from 'antd'


const ObrTestSettings = () => {
    return (
            <Card
                hoverable={true}
                title={`Подсказка для комиссии`}
                style={{marginBottom: '12px'}}
            >
                <Form.Item>
                    <Space direction={'vertical'}>
                        <Space>
                            <Switch/>
                            Перемешать вопросы
                        </Space>
                        <Space>
                            <Switch/>
                            Перемешать варианты ответов
                        </Space>
                    </Space>
                </Form.Item>
            </Card>
    )
}

export default ObrTestSettings