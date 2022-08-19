import { Modal, Row, Col, Form, Input, Select, TimePicker, InputNumber, Typography } from 'antd'

import { MyButton } from '../../../../components'
import { usePostAttestationsTestsBankMutation } from '../../../../services/AttestationService'

const { Option } = Select

const TBAddModal = ({ open, setOpen }) => {
    const [postAttestationsTestsBankMutation] = usePostAttestationsTestsBankMutation()
    const onSubmit = (data) => {
        console.log(data)

        // postAttestationsQualification(data).then((res) => {
        //     if (res.data) {
        //         message.success('Квалификация создана')
        //         setOpen(false)
        //     } else {
        //         message.error(res.error.data.errors[0])
        //     }
        //     console.log(res)
        // })
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
                <Form layout="vertical" onFinish={onSubmit} id="tbadd-form">
                    <Form.Item label="Название теста">
                        <Input placeholder="Название теста" />
                    </Form.Item>
                    <Form.Item label="Квалификация">
                        <Select
                            placeholder="Выберите квалификацию"
                            style={{
                                width: '100%',
                            }}
                            // onChange={(value) => setValue(value)}
                        >
                            <Option value="Квалификация 1">Квалификация 1</Option>
                            <Option value="Квалификация 2">Квалификация 2</Option>
                            <Option value="Квалификация 3">Квалификация 3</Option>
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
                    <Form.Item label="Количество вопросов в практической части">
                        <InputNumber style={{ width: '100%' }} defaultValue="1" />
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
