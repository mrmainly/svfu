import { Button, Card, Form, Input, List, InputNumber } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'

const PolQuestion = () => {
    return (
        <Card hoverable={false} title={`Poll Questions`} style={{ marginBottom: '12px' }}>
            <Form.List name={'strings'}>
                {(fields, { add, remove }) => (
                    <List header={<div>Strings</div>}>
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
                                                name={[field.name, 'name']}
                                                style={{ width: '100%' }}
                                            >
                                                <Input placeholder={'strings_name'} />
                                            </Form.Item>
                                        </div>
                                    }
                                />
                            </List.Item>
                        ))}
                        <Button onClick={() => add()} style={{ marginTop: 20 }}>
                            Добавить string
                        </Button>
                    </List>
                )}
            </Form.List>
            <Form.List name={'columns'}>
                {(fields, { add, remove }) => (
                    <List header={<div style={{ marginTop: 40 }}>Columns</div>}>
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
                                                name={[field.name, 'name']}
                                                style={{ width: '50%' }}
                                            >
                                                <Input placeholder={'column_name'} />
                                            </Form.Item>
                                            <Form.Item
                                                name={[field.name, 'score']}
                                                style={{ width: '50%' }}
                                            >
                                                <InputNumber
                                                    style={{ width: '100%' }}
                                                    type="number"
                                                    placeholder={'score'}
                                                />
                                            </Form.Item>
                                        </div>
                                    }
                                />
                            </List.Item>
                        ))}
                        <Button onClick={() => add()} style={{ marginTop: 20 }}>
                            Добавить column
                        </Button>
                    </List>
                )}
            </Form.List>
        </Card>
    )
}

export default PolQuestion
