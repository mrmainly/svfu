import { Row, Col, Button, Form, Input } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'
import PropTypes from 'prop-types'

const ConstructorVariantAnswer = ({ handleShowVariantAnswer }) => {
    return (
        <Form.List name="variant" initialValue={[{}, {}]}>
            {(fields, { add, remove }) => {
                const reset = () => {
                    remove(
                        fields.map((item) => {
                            if (item.name === 0 || item.name === 1) {
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
                            <Row key={key} justify="space-between" style={{ width: 300 }}>
                                <Col span={18}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'name']}
                                        rules={[
                                            {
                                                required: true,
                                                message:
                                                    'Заполните вариант ответа или удалите поле',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Вариант ответа" />
                                    </Form.Item>
                                </Col>
                                <Form.Item>
                                    {fields.length > 2 ? (
                                        <DeleteTwoTone
                                            twoToneColor="#EB5757"
                                            onClick={() => remove(name)}
                                        />
                                    ) : null}
                                </Form.Item>
                            </Row>
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
                                    handleShowVariantAnswer()
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

ConstructorVariantAnswer.propTypes = {
    handleShowVariantAnswer: PropTypes.func,
}

export default ConstructorVariantAnswer
