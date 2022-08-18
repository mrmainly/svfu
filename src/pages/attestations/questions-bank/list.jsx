import { useState } from 'react'
import { Modal, Row, Col, Form, Input, Select, TimePicker, InputNumber, Typography } from 'antd'

import QuestionsBankTable from '../components/tables/QuestionsBankTable'
import { MyButton } from '../../../components'
const { Search } = Input
const { Option } = Select

const QuestionsBank = () => {
    const [modalNewQuestion, setModalNewQuestion] = useState(false)
    const onSearch = (value) => console.log(value)
    return (
        <div>
            <Row gutter={10} style={{ marginBottom: '10px' }}>
                <Col>
                    <MyButton onClick={() => setModalNewQuestion(true)}>Создать вопрос</MyButton>
                </Col>
                <Col>
                    <Search
                        size="large"
                        placeholder="Поиск..."
                        onSearch={onSearch}
                        enterButton
                        style={{ borderRadius: 4 }}
                    />
                </Col>
                <Col>
                    <Select
                        placeholder="Выберите направление"
                        size="large"
                        // onChange={(value) => setValue(value)}
                    >
                        <Option value="Направление 1" />
                        <Option value="Направление 2" />
                        <Option value="Направление 3" />
                    </Select>
                </Col>
                <Col>
                    <Select
                        placeholder="Сложность"
                        size="large"
                        // onChange={(value) => setValue(value)}
                    >
                        <Option value="Легкая" />
                        <Option value="Средняя" />
                        <Option value="Тяжелая" />
                        <Option value="Открытый вопрос" />
                    </Select>
                </Col>
            </Row>
            <Modal
                destroyOnClose={true}
                title="Создание вопрос"
                visible={modalNewQuestion}
                onCancel={() => setModalNewQuestion(false)}
                style={{ top: 0 }}
                footer={[
                    <MyButton key="submit">Сохранить</MyButton>,
                    <MyButton
                        key="back"
                        type="default"
                        style={{ background: '#FFF' }}
                        onClick={() => setModalNewQuestion(false)}
                    >
                        Отмена
                    </MyButton>,
                ]}
            >
                <Form layout="vertical">
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
                    <Form.Item label="Время на тест(ЧЧ:мм)">
                        <TimePicker
                            placeholder="Таймер тестирования"
                            style={{ width: '100%' }}
                            format="HH:mm"
                        />
                    </Form.Item>

                    <Row gutter={[16, 0]}>
                        <Col span={12}>
                            <Form.Item label="Количество легких вопросов">
                                <InputNumber style={{ width: '100%' }} defaultValue="0" />
                            </Form.Item>
                            <Form.Item label="Количество средних вопросов">
                                <InputNumber style={{ width: '100%' }} defaultValue="0" />
                            </Form.Item>
                            <Form.Item label="Количество сложных вопросов">
                                <InputNumber style={{ width: '100%' }} defaultValue="0" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Балл за правильный ответ">
                                <InputNumber style={{ width: '100%' }} defaultValue="0" />
                            </Form.Item>
                            <Form.Item label="Балл за правильный ответ">
                                <InputNumber style={{ width: '100%' }} defaultValue="0" />
                            </Form.Item>
                            <Form.Item label="Балл за правильный ответ">
                                <InputNumber style={{ width: '100%' }} defaultValue="0" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item label="Допустимый балл теоретической части(в процентах)">
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
            <QuestionsBankTable />
        </div>
    )
}

export default QuestionsBank
