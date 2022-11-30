import { Card, Form, Select, Switch, TimePicker } from 'antd'
import { useState } from 'react'
import ResponseText from './response-text'
import ResponseScore from './response-score'

const {Option} = Select

const ObrTestSettings = () => {
    const [response, setResponse] = useState('score')
    return (
        <>
            <Card style={{marginBottom: '12px'}} title={'Параметры'}>
                <Card.Grid style={{width: '50%'}} hoverable={false}>
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
                            <Option value={'Ранжирование'}>
                                Ранжирование
                            </Option>
                            <Option value={'СВФУ'}>
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
                </Card.Grid>
                <Card.Grid style={{width: '50%'}} hoverable={false}>
                    <Form.Item name={'use_criterion_chapters'} valuePropName={'checked'} label={'Оценивать по разделам'}>
                        <Switch/>
                    </Form.Item>
                </Card.Grid>
            </Card>
            <Card
                hoverable={false}
                title={`Выставление баллов - макс. балл`}
                style={{ marginBottom: '12px' }}
                extra={
                    <Select defaultValue="score" onChange={(value) => setResponse(value)}>
                        <Select.Option value={'score'}>
                            балл
                        </Select.Option>
                        <Select.Option value={'text'}>
                            текст
                        </Select.Option>
                    </Select>
                }
            >
                {response === 'score'
                    ? <ResponseScore/>
                    : <ResponseText/>
                }
            </Card>

        </>
    )
}

export default ObrTestSettings