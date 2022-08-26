import {
    Modal,
    Row,
    Col,
    Form,
    Input,
    Select,
    TimePicker,
    InputNumber,
    Typography,
    message,
} from 'antd'
import moment from 'moment'

import { MyButton } from '../../../../components'
import {
    usePostAttestationsTestsBankMutation,
    useGetAttestationsTagQuery,
} from '../../../../services/AttestationService'

const { Option } = Select

const TBAddModal = ({ open, setOpen }) => {
    const [postAttestationsTestsBankMutation] = usePostAttestationsTestsBankMutation()
    const { data, isLoading } = useGetAttestationsTagQuery()

    const onSubmit = (data) => {
        const hhminuts =
            parseInt(moment(data.test_time).format('HH') * 60) +
            parseInt(moment(data.test_time).format('mm'))

        data.test_time = hhminuts
        // .toString()
        postAttestationsTestsBankMutation(data).then((res) => {
            if (res.data) {
                message.success('Тестирование создано')
                setOpen(false)
            } else {
                message.error(res.error.data.errors[0])
            }
            console.log(res)
        })
    }
    const onSearch = (value) => console.log(value)
    return (
        <div>
            <Modal
                destroyOnClose={true}
                title="Создание тестирования"
                visible={open}
                onCancel={() => setOpen(false)}
                style={{ top: 0 }}
                footer={[
                    <MyButton key="submit" onFinish={onSubmit} htmlType="submit" form="tbadd-form">
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
                <Form layout="vertical" onFinish={onSubmit} id="tbadd-form">
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
                                <InputNumber style={{ width: '100%' }} defaultValue="0" />
                            </Form.Item>
                            <Form.Item label="Количество средних вопросов" name="advanced_count">
                                <InputNumber style={{ width: '100%' }} defaultValue="0" />
                            </Form.Item>
                            <Form.Item label="Количество сложных вопросов" name="expert_count">
                                <InputNumber style={{ width: '100%' }} defaultValue="0" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Балл за правильный ответ" name="beginner_score">
                                <InputNumber style={{ width: '100%' }} defaultValue="0" />
                            </Form.Item>
                            <Form.Item label="Балл за правильный ответ" name="advanced_score">
                                <InputNumber style={{ width: '100%' }} defaultValue="0" />
                            </Form.Item>
                            <Form.Item label="Балл за правильный ответ" name="expert_score">
                                <InputNumber style={{ width: '100%' }} defaultValue="0" />
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

export default TBAddModal
