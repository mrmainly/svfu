import { Card, Form, Select, Spin, Switch, TimePicker } from 'antd'
import React, { useState } from 'react'
import ResponseText from './response-text'
import ResponseScore from './response-score'
import { useGetToolsDirectionQuery } from '../../../../../../../../services/ToolsService'

const {Option} = Select

const ObrTestSettings = () => {
    const { data, isLoading: isDirectionLoading } = useGetToolsDirectionQuery()
    const [response, setResponse] = useState('score')
    console.log(data)
    if (isDirectionLoading) {
        return (
            <div
                style={{
                    width: '100%',
                    height: 400,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Spin />
            </div>
        )
    }
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
                            {data?.map((item, index) => (
                                <Option value={item.id} key={index}>
                                    {item.name}
                                </Option>
                            ))}
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