import { Button, Card, Form, InputNumber, List, Space } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'

const ScoringPoints = () => {
    return (
        <Card hoverable={false} title={`Выставление баллов`} style={{ marginBottom: '12px' }}>
            <Form.List name={'scores'} initialValue={[{}]}>
                {(fields2, { add, remove }) => (
                    <List header={<div>Заполните поля условий </div>}>
                        {fields2.map((field, index) => (
                            <List.Item
                                key={field.key}
                                actions={[
                                    fields2.length > 1 ? (
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
                                        <Space>
                                            <Form.Item
                                                name={[field.name, 'name']}
                                                label={'Мин.'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Заполните вариант ответа или удалите поле',
                                                    },
                                                ]}
                                            >
                                                <InputNumber />
                                            </Form.Item>
                                            <Form.Item
                                                name={[field.name, 'name2']}
                                                label={'Макс.'}
                                                rules={[
                                                    {
                                                        required: true,
                                                        message:
                                                            'Заполните вариант ответа или удалите поле',
                                                    },
                                                ]}
                                            >
                                                <InputNumber />
                                            </Form.Item>
                                        </Space>
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
                            <Button onClick={() => add()}>Добавить условие</Button>
                        </Form.Item>
                    </List>
                )}
            </Form.List>
        </Card>
    )
}

export default ScoringPoints
