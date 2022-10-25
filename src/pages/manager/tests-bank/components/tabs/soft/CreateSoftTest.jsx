import { useState } from 'react'
import { Form, Input, Select, TimePicker, Spin, Button, message } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'
import moment from 'moment'
import PropTypes from 'prop-types'

import { useGetToolsDirectionQuery } from '../../../../../../services/ToolsService'
import {
    useGetSoftQuestionListQuery,
    usePostSoftTestMutation,
} from '../../../../../../services/manager/TestsBank'

const { Option } = Select

const CreateSoftTest = ({ setOpen }) => {
    const [directionName, setDirectionName] = useState('ewewr')

    const [postSoftTest] = usePostSoftTestMutation()
    const { data: directionList, isLoading: isDirectionLoading } = useGetToolsDirectionQuery()
    const { data: softQuestionList, isFetching } = useGetSoftQuestionListQuery({
        direction: directionName,
    })

    const onFinish = (data) => {
        const hhminuts =
            parseInt(moment(data.test_time).format('HH') * 60) +
            parseInt(moment(data.test_time).format('mm'))
        data.test_time = hhminuts

        postSoftTest(data).then((res) => {
            if (res.data) {
                message.success('Soft тест создан')
                setOpen(false)
            } else {
                message.error('Проверьте ваши поля Soft test не создан')
            }
        })
    }

    if (isDirectionLoading) {
        return <Spin />
    }

    const changeDirection = (value) => {
        directionList.forEach((item) => {
            if (value === item.id) setDirectionName(item.name)
        })
    }

    return (
        <Form onFinish={onFinish} layout="vertical" id="soft-create-form">
            <Form.Item
                name="name"
                label="Название теста"
                rules={[
                    {
                        required: true,
                        message: 'Название теста обязательное поле',
                    },
                ]}
            >
                <Input placeholder="название теста" />
            </Form.Item>
            <Form.Item
                name="direction"
                label="Квалификация"
                rules={[
                    {
                        required: true,
                        message: 'Квалификация обязательное поле',
                    },
                ]}
            >
                <Select
                    placeholder="Выберите квалификацию"
                    style={{
                        width: '100%',
                    }}
                    onSelect={(value) => {
                        changeDirection(value)
                    }}
                >
                    {directionList?.map((item, index) => (
                        <Option key={index} value={item.id}>
                            {item.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>
            <Form.Item
                label="Время на тест(ЧЧ:мм)"
                name="test_time"
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
            <Form.List name="soft_questions" style={{ opacity: isFetching ? 0.5 : 1 }}>
                {(fields, { add, remove }) => {
                    return (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div
                                    key={key}
                                    style={{ width: 300, display: 'flex', alignItems: 'center' }}
                                >
                                    <Form.Item
                                        name={name}
                                        label="Выбор вопроса"
                                        required
                                        {...restField}
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        <Select placeholder="Выберите задание">
                                            {softQuestionList?.results?.map((item, index) => (
                                                <Option key={index} value={item.id}>
                                                    {item.name}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                    {fields.length > 2 ? (
                                        <DeleteTwoTone
                                            twoToneColor="#EB5757"
                                            onClick={() => remove(name)}
                                            style={{ marginLeft: 20 }}
                                        />
                                    ) : null}
                                </div>
                            ))}
                            <Form.Item>
                                <Button
                                    onClick={() => add()}
                                    block
                                    type="primary"
                                    ghost
                                    style={{ width: 'max-content' }}
                                >
                                    Добавить задание
                                </Button>
                            </Form.Item>
                        </>
                    )
                }}
            </Form.List>
        </Form>
    )
}

CreateSoftTest.propTypes = {
    setOpen: PropTypes.func,
}

export default CreateSoftTest
