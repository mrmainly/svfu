import { Button, Form, InputNumber, List, Space } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'

const ResponseText = () => {
    return (
        <Form.List name={'main_criterion'} initialValue={[{}]}>
            {(fields, { add, remove }) => (
                <List header={<div>Заполните поля условий </div>}>
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
                                    <Space>
                                        <Form.Item
                                            name={[field.name, 'first_point']}
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
                                            name={[field.name, 'second_point']}
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
                                name={[field.name, 'response_score']}
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
    )
}

export default ResponseText