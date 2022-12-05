import { Button, Card, Form, Input, List } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'

const PolQuestion = () => {
    return (
        <Card hoverable={false} title={`Poll Questions`} style={{ marginBottom: '12px' }}>
            <Form.List name={'questions'}>
                {(fields, { add, remove }) => (
                    <List header={<div>Заполните Poll Questions</div>}>
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
                                                name={[field.name, 'strings_name']}
                                                style={{ width: '50%' }}
                                            >
                                                <Input placeholder={'strings_name'} />
                                            </Form.Item>
                                            <Form.Item
                                                name={[field.name, 'columns_name']}
                                                style={{ width: '50%' }}
                                            >
                                                <Input placeholder={'columns_name'} />
                                            </Form.Item>
                                            <Form.Item
                                                name={[field.name, 'score']}
                                                style={{ width: '20%' }}
                                            >
                                                <Input placeholder={'score'} />
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

export default PolQuestion
