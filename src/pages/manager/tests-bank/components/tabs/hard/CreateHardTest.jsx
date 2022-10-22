import { useState } from 'react'
import { Form, Row, Col, Input, Select, TimePicker, InputNumber, Typography, message } from 'antd'
import moment from 'moment'
import PropTypes from 'prop-types'

import { usePostAttestationsTestsBankMutation } from '../../../../../../services/manager/TestsBank'

import { useGetToolsDirectionQuery } from '../../../../../../services/ToolsService'

const { Option } = Select

const CreateHardTest = ({ setOpen }) => {
    const [bc, setBc] = useState(0)
    const [ac, setAc] = useState(0)
    const [ec, setEc] = useState(0)
    const [bs, setBs] = useState(0)
    const [aas, setAs] = useState(0)
    const [es, setEs] = useState(0)
    const [pro, setPro] = useState(0)
    const [postAttestationsTestsBankMutation] = usePostAttestationsTestsBankMutation()
    const { data } = useGetToolsDirectionQuery()

    const onSubmit = (data) => {
        const hhminuts =
            parseInt(moment(data.test_time).format('HH') * 60) +
            parseInt(moment(data.test_time).format('mm'))

        data.test_time = hhminuts
        postAttestationsTestsBankMutation(data).then((res) => {
            if (res.data) {
                message.success('Тестирование создано')
                setOpen(false)
            } else {
                message.error(res.error.data.errors[0])
            }
        })
    }

    return (
        <Form
            layout="vertical"
            onFinish={onSubmit}
            id="tbadd-form"
            initialValues={{
                ['passing_percent_score']: 0,
            }}
        >
            <Form.Item required label="Название теста" name="name">
                <Input placeholder="Название теста" />
            </Form.Item>
            <Form.Item required label="Квалификация" name="direction">
                <Select
                    placeholder="Выберите квалификацию"
                    style={{
                        width: '100%',
                    }}
                >
                    {data?.map((item, index) => (
                        <Option key={index} value={item.id}>
                            {item.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item required label="Время на тест(ЧЧ:мм)" name="test_time">
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
            <Row gutter={[10, 10]}>
                <Col span={21}>
                    <Typography>Общее количество вопросов в теоретической части:</Typography>
                    <Typography>Максимальный балл теоретической части:</Typography>
                    <Typography>Допустимый балл теоретической части:</Typography>
                </Col>
                <Col span={3}>
                    <Typography>{ac + bc + ec}</Typography>
                    <Typography>{bc * bs + aas * ac + es * ec}</Typography>
                    <Typography>{((bc * bs + aas * ac + es * ec) / 100) * pro}</Typography>
                </Col>
            </Row>
        </Form>
    )
}

CreateHardTest.propTypes = {
    setOpen: PropTypes.func,
}

export default CreateHardTest
