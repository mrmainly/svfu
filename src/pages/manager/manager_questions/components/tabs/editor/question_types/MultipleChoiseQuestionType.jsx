import { Button, Card, Form, Input, InputNumber, List } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'

const MultipleChoiseQuestionType = () => {
    return (
        <Card
            hoverable={false}
            title={`Множественный выбор - варианты ответов`}
            style={{ marginBottom: '12px' }}
        >
            <Form.List name={'questions'}>
                {(fields, { add, remove }) => (
                    <List header={<div>Заполните варианты ответов и баллы</div>}>
                        {fields.map((field, index) => (
                            <List.Item
                                style={{ marginTop: 22 }}
                                key={field.key}
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
                                    avatar={<Form.Item>{index + 1}</Form.Item>}
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

export default MultipleChoiseQuestionType
