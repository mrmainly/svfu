import { Button, Card, Form, Input, List } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'

const Matching = () => {
    return (
        <Card
            hoverable={false}
            title={`Установление соответствий`}
            style={{ marginBottom: '12px' }}
        >
            <Form.List name={'questions'}>
                {(fields, { add, remove }) => (
                    <List header={<div>Заполните соответствияываы</div>}>
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
                                    avatar={<Form.Item>{index + 1}</Form.Item>}
                                    description={
                                        <div style={{ display: 'flex', gap: 10 }}>
                                            <Form.Item
                                                name={[field.name, 'first_string']}
                                                style={{ width: '50%' }}
                                            >
                                                <Input placeholder={'label'} />
                                            </Form.Item>
                                            <Form.Item
                                                name={[field.name, 'second_string']}
                                                style={{ width: '50%' }}
                                            >
                                                <Input placeholder={'value'} />
                                            </Form.Item>
                                            <Form.Item
                                                name={[field.name, 'score']}
                                                style={{ width: '20%' }}
                                            >
                                                <Input placeholder={'баллы'} />
                                            </Form.Item>
                                        </div>
                                    }
                                />
                            </List.Item>
                        ))}
                        <Button onClick={() => add()} style={{ marginTop: 20 }}>
                            Добавить value
                        </Button>
                    </List>
                )}
            </Form.List>
        </Card>
    )
}

export default Matching
