import { Button, Card, Col, Form, Input, InputNumber, Row, Select, TimePicker, Typography } from 'antd'
import { useState } from 'react'
import moment from 'moment/moment'

const {Option} = Select
const HardTest = () => {
    const [bc, setBc] = useState(0)
    const [ac, setAc] = useState(0)
    const [ec, setEc] = useState(0)
    const [bs, setBs] = useState(0)
    const [aas, setAs] = useState(0)
    const [es, setEs] = useState(0)
    const [pro, setPro] = useState(0)
    const handleSubmit = (data) => {
        console.log(data)
        const hhminuts =
            parseInt(moment(data.test_time).format('HH') * 60) +
            parseInt(moment(data.test_time).format('mm'))

        data.test_time = hhminuts
        const unitFormData = new FormData()
        unitFormData.append('name', data.name)
        unitFormData.append('description', data.description)
        unitFormData.append('direction', data.direction)
        unitFormData.append('test_time', data.test_time)
        unitFormData.append('unit_type', 'HARD')
    }
    return (
        <Form layout="vertical" style={{width: 'auto'}} onFinish={handleSubmit}>
            <Card style={{marginBottom: '12px'}}>
                <Form.Item name={'name'}>
                    <Input
                        bordered={false}
                        placeholder={'Название тестирования'}
                        style={{ backgroundColor: '#f5f5f5', color: 'black' }}
                    />
                </Form.Item>
                <Form.Item label="Описание" name={'description'}>
                    <Input.TextArea rows={4}/>
                </Form.Item>
                <Form.Item
                    name={'direction'}
                    label={'Квалификация'}
                    rules={[
                        {
                            required: true,
                            message: 'Обязательное поле',
                        },
                    ]}
                >
                    <Select
                        placeholder={'Выберите квалификацию'}
                    >
                        <Option value={1}>
                            Ранжирование
                        </Option>
                        <Option value={2}>
                            СВФУ
                        </Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Время на тест(ЧЧ:мм)"
                    name="test_time"
                    required={true}
                    rules={[
                        {
                            required: true,
                            message: 'Время теста обязательное поле',
                        },
                    ]}
                >
                    <TimePicker
                        placeholder="Таймер тестирования"
                        style={{ width: '100%' }}
                        format="HH:mm"
                    />
                </Form.Item>
                <Row gutter={[16, 0]}>
                    <Col span={12}>
                        <Form.Item required label="Количество легких вопросов" name="beginner_count">
                            <InputNumber onChange={(value) => setBc(value)} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item required label="Количество средних вопросов" name="advanced_count">
                            <InputNumber onChange={(value) => setAc(value)} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item required label="Количество сложных вопросов" name="expert_count">
                            <InputNumber onChange={(value) => setEc(value)} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item required label="Балл за правильный ответ" name="beginner_score">
                            <InputNumber onChange={(value) => setBs(value)} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item required label="Балл за правильный ответ" name="advanced_score">
                            <InputNumber onChange={(value) => setAs(value)} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item required label="Балл за правильный ответ" name="expert_score">
                            <InputNumber onChange={(value) => setEs(value)} style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item
                    required
                    label="Допустимый балл теоретической части(в процентах)"
                    name="passing_percent_score"
                >
                    <InputNumber
                        onChange={(value) => setPro(value)}
                        style={{ width: '100%' }}
                        min={0}
                        max={100}
                        formatter={(value) => `${value}%`}
                    />
                </Form.Item>
                <Row>
                    <Col span={23}>
                        <Typography>Общее количество вопросов в теоретической части:</Typography>
                        <Typography>Максимальный балл теоретической части:</Typography>
                        <Typography>Допустимый балл теоретической части:</Typography>
                    </Col>
                    <Col>
                        <Typography>{ac + bc + ec}</Typography>
                        <Typography>{bc * bs + aas * ac + es * ec}</Typography>
                        <Typography>{((bc * bs + aas * ac + es * ec) / 100) * pro}</Typography>
                    </Col>
                </Row>
            </Card>
            <Button htmlType={'submit'}>Создать</Button>
        </Form>
    )
}

export default HardTest