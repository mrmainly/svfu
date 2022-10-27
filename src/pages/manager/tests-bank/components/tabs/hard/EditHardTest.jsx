import { useState, useEffect } from 'react'
import {
    Row,
    Col,
    Form,
    Input,
    Select,
    TimePicker,
    InputNumber,
    Typography,
    Space,
    Switch,
    message,
} from 'antd'
import moment from 'moment'
import PropTypes from 'prop-types'

import {
    usePatchAttestationsTestsBankIdMutation,
    usePutAttestationsTestsBankIdMutation,
} from '../../../../../../services/manager/TestsBank'
import { useGetToolsDirectionQuery } from '../../../../../../services/ToolsService'

const { Option } = Select

const EditHardTest = ({ dataList, setOpen }) => {
    const [bc, setBc] = useState(0)
    const [ac, setAc] = useState(0)
    const [ec, setEc] = useState(0)
    const [bs, setBs] = useState(0)
    const [aas, setAs] = useState(0)
    const [es, setEs] = useState(0)
    const [pro, setPro] = useState(0)
    const [active, setActive] = useState(dataList[0].is_active)
    const { data: dataDirection } = useGetToolsDirectionQuery()
    const [patchAttestationsTestsBankId] = usePatchAttestationsTestsBankIdMutation()
    const [putAttestationsTestsBankId] = usePutAttestationsTestsBankIdMutation()
    useEffect(() => {
        setBc(dataList[0]?.beginner_count)
        setAc(dataList[0]?.advanced_count)
        setEc(dataList[0]?.expert_count)
        setBs(dataList[0]?.beginner_score)
        setAs(dataList[0]?.advanced_score)
        setEs(dataList[0]?.expert_score)
        setPro(dataList[0]?.passing_percent_score)
        setActive(dataList[0]?.is_active)
    }, [dataList])
    console.log(dataList)
    const onSubmit = (data) => {
        const minutes =
            parseInt(moment(data.test_time).format('HH') * 60) +
            parseInt(moment(data.test_time).format('mm'))

        data.test_time = minutes
        if (dataList[0]?.is_active !== active) {
            putAttestationsTestsBankId({ id: dataList[0]?.id }).then((res) => {
                if (!res.data) {
                    message.error(res.error.data.errors[0])
                }
            })
        }
        patchAttestationsTestsBankId({ id: dataList[0].id, body: data }).then((res) => {
            if (res.data) {
                message.success('Тест изменен')
                setOpen(false)
            } else {
                message.error(res.error.data.errors[0])
            }
        })
    }
    const hours = Math.floor(dataList[0]?.test_time / 60) + ':' + (dataList[0]?.test_time % 60)
    const hhminuts = moment(hours, 'HH:mm')

    return (
        <Form
            layout="vertical"
            initialValues={{
                ['name']: dataList[0]?.name,
                ['direction']: dataList[0]?.direction?.id,
                ['test_time']: hhminuts,
                ['beginner_count']: dataList[0]?.beginner_count,
                ['advanced_count']: dataList[0]?.advanced_count,
                ['expert_count']: dataList[0]?.expert_count,
                ['beginner_score']: dataList[0]?.beginner_score,
                ['advanced_score']: dataList[0]?.advanced_score,
                ['expert_score']: dataList[0]?.expert_score,
                ['passing_percent_score']: dataList[0]?.passing_percent_score,
            }}
            onFinish={onSubmit}
            id="tbedit-form"
        >
            <Form.Item label="Название теста" name="name">
                <Input placeholder="Название теста" />
            </Form.Item>
            <Form.Item label="Квалификация" name="direction">
                <Select
                    placeholder="Выберите квалификацию"
                    style={{
                        width: '100%',
                    }}
                >
                    {!dataList[0]?.direction?.is_active && (
                        <Option disabled value={dataList[0]?.direction?.id} key="qwe">
                            {dataList[0]?.direction?.name}
                        </Option>
                    )}
                    {dataDirection?.map((item, index) => (
                        <Option key={index} value={item.id}>
                            {item.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item label="Время на тест(ЧЧ:мм)" name="test_time">
                <TimePicker
                    placeholder="Таймер тестирования"
                    style={{ width: '100%' }}
                    format="HH:mm"
                />
            </Form.Item>

            <Row gutter={[16, 0]}>
                <Col span={12}>
                    <Form.Item label="Количество легких вопросов" name="beginner_count">
                        <InputNumber onChange={(value) => setBc(value)} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label="Количество средних вопросов" name="advanced_count">
                        <InputNumber onChange={(value) => setAc(value)} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label="Количество сложных вопросов" name="expert_count">
                        <InputNumber onChange={(value) => setEc(value)} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item label="Балл за правильный ответ" name="beginner_score">
                        <InputNumber onChange={(value) => setBs(value)} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label="Балл за правильный ответ" name="advanced_score">
                        <InputNumber onChange={(value) => setAs(value)} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label="Балл за правильный ответ" name="expert_score">
                        <InputNumber onChange={(value) => setEs(value)} style={{ width: '100%' }} />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
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
            <Space align="baseline">
                <Form.Item>
                    <Switch
                        defaultChecked={active}
                        onChange={(e) => {
                            setActive(e)
                        }}
                    />
                </Form.Item>
                <Typography>Активность квалификации</Typography>
            </Space>
        </Form>
    )
}

EditHardTest.propTypes = {
    dataList: PropTypes.array,

    setOpen: PropTypes.func,
}

export default EditHardTest
