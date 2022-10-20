import { Button, Form, Input, Space } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'
import PropTypes from 'prop-types'

const ScoringPoints = ({ handleShowScoringPoints }) => {
    return (
        <Form.List name="points" initialValue={[{}]}>
            {(fields, { add, remove }) => {
                const reset = () => {
                    remove(
                        fields.map((item) => {
                            if (item.name === 0) {
                                return ''
                            } else {
                                return item.name
                            }
                        })
                    )
                }
                return (
                    <>
                        {fields.map(({ key, name, ...restField }) => (
                            <Space key={key} style={{ display: 'flex', alignItems: 'center' }}>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'condition']}
                                    label="Условие"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Заполните условие выставления балла',
                                        },
                                    ]}
                                    style={{ width: 300 }}
                                >
                                    <Input placeholder="Напишите условие выставления балла" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'point']}
                                    label="Баллы"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Заполните кол-во баллов',
                                        },
                                    ]}
                                >
                                    <Input placeholder="1" type="number" />
                                </Form.Item>
                                {fields.length > 1 && (
                                    <DeleteTwoTone
                                        twoToneColor="#EB5757"
                                        onClick={() => remove(name)}
                                        style={{ marginLeft: 10 }}
                                    />
                                )}
                            </Space>
                        ))}
                        <Form.Item>
                            <Button
                                onClick={() => add()}
                                block
                                type="primary"
                                ghost
                                style={{ width: 'max-content' }}
                            >
                                Добавить вариант ответа
                            </Button>
                            <Button
                                onClick={() => {
                                    reset()
                                    handleShowScoringPoints()
                                }}
                                block
                                type="primary"
                                danger
                                style={{ width: 'max-content', marginLeft: 10 }}
                            >
                                Убрать варианты ответа
                            </Button>
                        </Form.Item>
                    </>
                )
            }}
        </Form.List>
    )
}

ScoringPoints.propTypes = {
    handleShowScoringPoints: PropTypes.func,
}

export default ScoringPoints
