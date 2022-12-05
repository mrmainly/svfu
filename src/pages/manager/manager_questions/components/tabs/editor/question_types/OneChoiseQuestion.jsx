import { Button, Card, Form, Input, InputNumber, List } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'

const OneChoiseQuestionType = () => {
    return (
        <Card
            hoverable={false}
            title={`Одиночный выбор - варианты ответов`}
            style={{ marginBottom: '12px' }}
        >
            <Form.List name={'questions'} initialValue={[{}]}>
                {(fields, { add, remove }) => (
                    <List header={<div>Заполните варианты ответов и баллы </div>}>
                        {fields.map((field, index) => (
                            <List.Item
                                key={field.key}
                                style={{ marginTop: 22 }}
                                actions={[
                                    fields.length > 1 ? (
                                        <div style={{ marginTop: '-15px' }}>
                                            <DeleteTwoTone
                                                twoToneColor={'#EB5757'}
                                                onClick={() => remove(field.name)}
                                            />
                                        </div>
                                    ) : null,
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Form.Item>
                                            <div>{index + 1}</div>
                                        </Form.Item>
                                    }
                                    description={
                                        <Form.Item
                                            name={[field.name, 'name']}
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Заполните вариант ответа или удалите поле',
                                                },
                                            ]}
                                        >
                                            <Input
                                                placeholder={'Вариант ответа'}
                                                style={{ width: '95%' }}
                                            />
                                        </Form.Item>
                                    }
                                />
                                <Form.Item
                                    name={[field.name, 'score']}
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Выставите баллы',
                                        },
                                    ]}
                                >
                                    <InputNumber placeholder={'Балл'} />
                                </Form.Item>
                            </List.Item>
                        ))}
                        <Button onClick={() => add()} style={{ marginTop: 20 }}>
                            Добавить вариант ответа
                        </Button>
                    </List>
                )}
            </Form.List>
        </Card>
    )
}

export default OneChoiseQuestionType
