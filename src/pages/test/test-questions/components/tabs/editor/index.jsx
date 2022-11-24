import { DeleteTwoTone, SettingTwoTone } from '@ant-design/icons'
import { Button, Card, Form, Input, InputNumber, List, Space } from 'antd'
import { useState } from 'react'
import MyDrawer from '../../drawer'
import ReactSummernote from 'react-summernote'

import './soft.css'

const TestSoftEditor = () => {
    const [question, setQuestion] = useState('')
    const [open, setOpen] = useState(false)
    const showDrawer = () => {
        setOpen(true)
    }
    const onClose = () => {
        setOpen(false)
    }
    const onChange = (content) => {
        console.log('onChange', content)
    }
    return (
        <div>
            <Button
                type={"primary"}
                onClick={showDrawer}
                className='floatButton'
                shape="circle"
                icon={ <SettingTwoTone className="icon" />}
            />
            <MyDrawer open={open} onClose={onClose} setQuestion={setQuestion}/>
            <Card
                hoverable={true}
                title={`Описание вопроса`}
                style={{marginBottom: '12px'}}
            >
                <Form.Item >
                    <ReactSummernote
                        value="Default value"
                        options={{
                            lang: 'ru-RU',
                            height: 250,
                            dialogsInBody: true,
                            toolbar: [
                                ["style", ["bold", "italic", "underline", "clear"]],
                                ["font", ["strikethrough", "superscript", "subscript"]],
                                ["fontsize", ["fontsize"]],
                                ["para", ["ul", "ol", "paragraph"]],
                                ["table", ["table"]],
                                ["insert", ["link", "picture"]],
                                ["view", ["codeview"]],
                            ],

                        }}
                        onChange={(content)=>onChange(content)}
                    />
                </Form.Item>
            </Card>

            <Card
                hoverable={true}
                title={`Задание вопроса`}
                style={{marginBottom: '12px'}}
            >
                <Form.Item>
                    <ReactSummernote
                        value="Default value"
                        options={{
                            lang: 'ru-RU',
                            height: 250,
                            dialogsInBody: true,
                            toolbar: [
                                ["style", ["bold", "italic", "underline", "clear"]],
                                ["font", ["strikethrough", "superscript", "subscript"]],
                                ["fontsize", ["fontsize"]],
                                ["para", ["ul", "ol", "paragraph"]],
                                ["table", ["table"]],
                                ["insert", ["link", "picture"]],
                                ["view", ["codeview"]],
                            ],

                        }}
                        onChange={(content)=>onChange(content)}
                    />
                </Form.Item>
            </Card>

            {question === 'Одиночный выбор'
                ? (
                    <Card
                        hoverable={true}
                        title={`Одиночный выбор - варианты ответов`}
                        style={{marginBottom: '12px'}}
                    >
                        <Form.List name={'questions'} initialValue={[{}]}>
                            {(fields, {add, remove}) => (
                                <List header={<div>Заполните варианты ответов и баллы </div>}>
                                    {fields.map(
                                        (field, index) => (
                                            <List.Item
                                                key={field.key}
                                                actions={[fields.length > 1 ? (
                                                    <DeleteTwoTone
                                                        twoToneColor={'#EB5757'}
                                                        onClick={() => remove(field.name)}
                                                    />
                                                ) : null]}
                                            >
                                                <List.Item.Meta
                                                    avatar={<Form.Item>{index + 1}</Form.Item>}
                                                    description={
                                                        <Form.Item
                                                            name={[field.name, 'name']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Заполните вариант ответа или удалите поле'
                                                                }
                                                            ]}
                                                        >
                                                            <Input placeholder={'Вариант ответа'} bordered={false}/>
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
                                                    <InputNumber placeholder={'Балл'}/>
                                                </Form.Item>
                                            </List.Item>
                                        )
                                    )}
                                    <Form.Item>
                                        <Button
                                            onClick={() => add()}
                                        >
                                            Добавить вариант ответа
                                        </Button>
                                    </Form.Item>
                                </List>
                            )}
                        </Form.List>
                    </Card>
                )
                : (null)
            }

            <Card
                hoverable={true}
                title={`Выставление баллов`}
                style={{marginBottom: '12px'}}
            >
                <Form.List name={'scores'} initialValue={[{}]}>
                    {(fields2, {add, remove}) => (
                        <List header={<div>Заполните поля условий </div>}>
                            {fields2.map(
                                (field, index) => (
                                    <List.Item
                                        key={field.key}
                                        actions={[fields2.length > 1 ? (
                                            <DeleteTwoTone
                                                twoToneColor={'#EB5757'}
                                                onClick={() => remove(field.name)}
                                            />
                                        ) : null]}
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
                                                                message: 'Заполните вариант ответа или удалите поле'
                                                            }
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
                                                                message: 'Заполните вариант ответа или удалите поле'
                                                            }
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
                                            <InputNumber placeholder={'Балл'}/>
                                        </Form.Item>
                                    </List.Item>
                                )
                            )}
                            <Form.Item>
                                <Button
                                    onClick={() => add()}
                                >
                                    Добавить условие
                                </Button>
                            </Form.Item>
                        </List>
                    )}
                </Form.List>
            </Card>
        </div>
    )
}

export default TestSoftEditor