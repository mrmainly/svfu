import { Card, Checkbox, Form, Space, TimePicker, Select, Spin } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { useGetToolsDirectionQuery } from '../../../../../../services/ToolsService'
import ScoringPoints from './scoring_points'

const { Option } = Select

const TestSoftParameters = () => {
    const [time, setTime] = useState(false)
    const [criterionShow, setCriterionShow] = useState(false)

    const { data: directionList, isLoading: isDirectionLoading } = useGetToolsDirectionQuery()
    const { questionType } = useSelector((state) => state.constructor_question_slice)

    const onTime = (time, timeString) => {
        console.log(time, timeString)
    }

    const difficulty = [
        {
            label: 'BEGINNER',
            value: 'BEGINNER',
        },
        {
            label: 'ADVANCED',
            value: 'ADVANCED',
        },
        {
            label: 'EXPERT',
            value: 'EXPERT',
        },
        {
            label: 'DESCRIBE',
            value: 'DESCRIBE',
        },
    ]

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
        <Card>
            <Form.Item
                label="Сложность задания"
                labelCol={{ span: 24 }}
                style={{ marginBottom: 10 }}
                name="difficulty"
                rules={[
                    {
                        required: true,
                        message: 'Сложность задания является обязательным полем',
                    },
                ]}
            >
                <Select style={{ width: 220 }} placeholder="Сложность задания">
                    {difficulty.map((item, index) => (
                        <Option key={index} value={item.label}>
                            {item.label}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Квалификация"
                name="direction"
                labelCol={{ span: 24 }}
                style={{ marginBottom: 20 }}
                rules={[
                    {
                        required: true,
                        message: 'Квалификация является обязательным полем',
                    },
                ]}
            >
                <Select mode="multiple" style={{ width: 220 }} placeholder="Квалификация">
                    {directionList?.map((item, index) => (
                        <Option value={item.id} key={index}>
                            {item.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item style={{ marginBottom: 10 }} name="time">
                <Space direction={'vertical'}>
                    <Checkbox onChange={() => setTime(!time)}>
                        Ограничить время ответа на вопрос
                    </Checkbox>
                    {time && (
                        <Space style={{ marginLeft: '50px' }}>
                            <div>В секундах</div>
                            <TimePicker onChange={onTime} format={'ss'} />
                        </Space>
                    )}
                </Space>
            </Form.Item>
            <Form.Item style={{ marginBottom: 10 }} name="is_active">
                <Checkbox defaultChecked>Активность вопроса</Checkbox>
            </Form.Item>
            <Form.Item style={{ marginBottom: 10 }} name="expert_review">
                <Checkbox>Проверка экспертом</Checkbox>
            </Form.Item>
            {questionType === 'SOFT' && (
                <div>
                    <Form.Item style={{ marginBottom: 0 }} name="use_criterion">
                        <Checkbox onChange={() => setCriterionShow(!criterionShow)}>
                            Выставление баллов
                        </Checkbox>
                    </Form.Item>
                    {criterionShow && <ScoringPoints />}
                </div>
            )}
        </Card>
    )
}

export default TestSoftParameters
