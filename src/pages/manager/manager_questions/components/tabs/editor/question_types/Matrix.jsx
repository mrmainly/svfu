import { Button, Form, Input, Card } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'

const { TextArea } = Input

const MatrixQuestion = () => {
    return (
        <Card title="Matrix Question">
            <Form.List name="table_quest" initialValue={[{}]}>
                {(fields, { add, remove }) => {
                    const resetVariant = (key) => {
                        remove(
                            fields.map((item) => {
                                if (item.key === key) return item.name
                            })
                        )
                    }
                    return (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key}>
                                    <Form.Item name={[name, 'name']} {...restField}>
                                        <TextArea placeholder="Описание вопроса" />
                                    </Form.Item>
                                    <Form.Item {...restField} name={[key, 'score']}>
                                        <Input placeholder="Заполните баллы" type="number" />
                                    </Form.Item>
                                    <Form.List initialValue={[{}, {}]} name={[name, 'answers']}>
                                        {(fields, { add, remove }) => {
                                            return (
                                                <>
                                                    {fields.map(
                                                        ({
                                                            key,
                                                            name: variant_name,
                                                            ...restField
                                                        }) => (
                                                            <div
                                                                key={key}
                                                                style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'space-between',
                                                                    width: 'max-content',
                                                                }}
                                                            >
                                                                <Form.Item
                                                                    {...restField}
                                                                    name={[variant_name, 'name']}
                                                                    rules={[
                                                                        {
                                                                            required: true,
                                                                            message:
                                                                                'Заполните вариант ответа или удалите поле',
                                                                        },
                                                                    ]}
                                                                    style={{ marginRight: 10 }}
                                                                >
                                                                    <Input placeholder="Вариант ответа" />
                                                                </Form.Item>
                                                                <Form.Item
                                                                    {...restField}
                                                                    name={[variant_name, 'score']}
                                                                    style={{ marginRight: 10 }}
                                                                >
                                                                    <Input
                                                                        placeholder="Заполните баллы"
                                                                        type="number"
                                                                    />
                                                                </Form.Item>
                                                                <Form.Item>
                                                                    {fields.length > 2 ? (
                                                                        <DeleteTwoTone
                                                                            twoToneColor="#EB5757"
                                                                            onClick={() =>
                                                                                remove(variant_name)
                                                                            }
                                                                        />
                                                                    ) : null}
                                                                </Form.Item>
                                                            </div>
                                                        )
                                                    )}
                                                    <div style={{ display: 'flex' }}>
                                                        <Button
                                                            onClick={() => add()}
                                                            block
                                                            type="primary"
                                                            ghost
                                                            style={{
                                                                width: 'max-content',
                                                                marginBottom: 20,
                                                            }}
                                                        >
                                                            Добавить вариант
                                                        </Button>
                                                        <Button
                                                            onClick={() => {
                                                                resetVariant(key)
                                                            }}
                                                            block
                                                            type="primary"
                                                            danger
                                                            style={{
                                                                width: 'max-content',
                                                                marginLeft: 10,
                                                            }}
                                                        >
                                                            Убрать вопрос
                                                        </Button>
                                                    </div>
                                                    <div
                                                        style={{
                                                            height: 1,
                                                            background: '#E6E6E6',
                                                            width: 350,
                                                            marginBottom: 20,
                                                        }}
                                                    />
                                                </>
                                            )
                                        }}
                                    </Form.List>
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
                                    Добавить вопрос
                                </Button>
                            </Form.Item>
                        </>
                    )
                }}
            </Form.List>
        </Card>
    )
}

export default MatrixQuestion
