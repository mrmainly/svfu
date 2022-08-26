import moment from 'moment'
import {
    message,
    Modal,
    Row,
    Col,
    Form,
    Input,
    Select,
    TimePicker,
    InputNumber,
    Typography,
} from 'antd'

import { MyButton } from '../../../../components'
import {
    usePatchAttestationsTestsBankIdMutation,
    useGetAttestationsTagQuery,
} from '../../../../services/AttestationService'
const { TextArea } = Input
const { Option } = Select

const TBEditModal = ({ open, setOpen, dataList }) => {
    const { data, isLoading } = useGetAttestationsTagQuery()
    const [patchAttestationsTestsBankId] = usePatchAttestationsTestsBankIdMutation()
    const onSubmit = (data) => {
        const minutes =
            parseInt(moment(data.test_time).format('HH') * 60) +
            parseInt(moment(data.test_time).format('mm'))

        data.test_time = minutes
        patchAttestationsTestsBankId({ id: dataList[0].id, body: data }).then((res) => {
            if (res.data) {
                message.success('Квалификация изменена')
                setOpen(false)
            } else {
                message.error(res.error.data.errors[0])
            }
            console.log(res)
        })
    }
    const onSearch = (value) => console.log(value)
    const hours = Math.floor(dataList[0]?.test_time / 60) + ':' + (dataList[0]?.test_time % 60)
    const hhminuts = moment(hours, 'HH:mm')

    return (
        <div>
            <Modal
                destroyOnClose={true}
                title="Создание тестирования"
                visible={open}
                onCancel={() => setOpen(false)}
                style={{ top: 0 }}
                footer={[
                    <MyButton key="submit" htmlType="submit" form="tbadd-form">
                        Сохранить
                    </MyButton>,
                    <MyButton
                        key="back"
                        type="default"
                        style={{ background: '#FFF' }}
                        onClick={() => setOpen(false)}
                    >
                        Отмена
                    </MyButton>,
                ]}
            >
                <Form
                    layout="vertical"
                    initialValues={{
                        ['name']: dataList[0]?.name,
                        ['tag_direction']: {
                            value: dataList[0]?.direction.tag_direction.id,
                            label: dataList[0]?.direction.tag_direction.name,
                        },
                        ['test_time']: hhminuts,
                        ['beginner_count']: dataList[0]?.beginner_count,
                        ['advanced_count']: dataList[0]?.advanced_count,
                        ['expert_count']: dataList[0]?.expert_count,
                        ['beginner_score']: dataList[0]?.beginner_score,
                        ['advanced_score']: dataList[0]?.advanced_score,
                        ['passing_percent_score']: dataList[0]?.passing_percent_score,
                    }}
                    onFinish={onSubmit}
                    id="tbadd-form"
                >
                    <Form.Item label="Название теста" name="name">
                        <Input placeholder="Название теста" />
                    </Form.Item>
                    <Form.Item label="Квалификация" name="tag_direction">
                        <Select
                            placeholder="Выберите квалификацию"
                            style={{
                                width: '100%',
                            }}
                            // onChange={(value) => setValue(value)}
                        >
                            {data?.results.map((item, index) => (
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
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item label="Количество средних вопросов" name="advanced_count">
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item label="Количество сложных вопросов" name="expert_count">
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Балл за правильный ответ" name="beginner_score">
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item label="Балл за правильный ответ" name="advanced_score">
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                            <Form.Item label="Балл за правильный ответ" name="expert_score">
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        label="Допустимый балл теоретической части(в процентах)"
                        name="passing_percent_score"
                    >
                        <InputNumber
                            style={{ width: '100%' }}
                            defaultValue="0"
                            min={0}
                            max={100}
                            formatter={(value) => `${value}%`}
                            //parser?????
                        />
                    </Form.Item>
                    <Row gutter={[10, 10]}>
                        <Col span={22}>
                            <Typography>
                                Общее количество вопросов в теоретической части:
                            </Typography>
                            <Typography>Общее количество вопросов в практической части:</Typography>
                            <Typography>Максимальный балл теоретической части:</Typography>
                            <Typography>Допустимый балл теоретической части:</Typography>
                        </Col>
                        <Col span={2}>
                            <Typography>100</Typography>
                            <Typography>100</Typography>
                            <Typography>100</Typography>
                            <Typography>100</Typography>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    )
}

export default TBEditModal
