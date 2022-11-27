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
                                actions={[
                                    fields.length > 1 ? (
                                        <DeleteTwoTone
                                            twoToneColor={'#EB5757'}
                                            onClick={() => remove(field.name)}
                                        />
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
                                                bordered={false}
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
                        <Form.Item>
                            <Button onClick={() => add()}>Добавить вариант ответа</Button>
                        </Form.Item>
                    </List>
                )}
            </Form.List>
        </Card>
    )
}

export default OneChoiseQuestionType
