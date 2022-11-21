import { Button, Divider, Form, Input, InputNumber, List } from 'antd'
import ReactSummernote from "react-summernote"

import { useState } from 'react'

import MyDrawer from './components/drawer'
import "react-summernote/dist/react-summernote.css" // import styles
import "bootstrap/js/dist/modal"
import "bootstrap/js/dist/dropdown"
import "bootstrap/js/dist/tooltip"
import "bootstrap/dist/css/bootstrap.css"
import { DeleteTwoTone } from '@ant-design/icons'

const TestSoftQuestion = () => {
    const [open, setOpen] = useState(false)
    console.log(open)
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
            <Button type={"primary"} onClick={showDrawer}>
                Open
            </Button>
            <MyDrawer open={open} onClose={onClose}/>
            <Form layout={"vertical"}>
                <Divider orientation={'left'}>Описание вопроса</Divider>
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
                <Divider orientation={'left'}>Задание вопроса</Divider>
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
                <Divider orientation={'left'}>Варианты ответов</Divider>
                <Form.List name={'variants'} initialValue={[{}]}>
                    {(fields, {add, remove}) => (
                        <List header={<div>№ Текст вариантов ответов Кол-во баллов</div>}>
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
                <Divider orientation={'left'}>Выставление баллов</Divider>
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
                                                onClick={() => remove(fields2.name)}
                                            />
                                        ) : null]}
                                    >
                                        <List.Item.Meta
                                            avatar={<Form.Item>{index + 1}</Form.Item>}
                                            description={
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
                <Divider orientation={'left'}>Подсказка для экперта</Divider>
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
            </Form>
        </div>
    )
}

export default TestSoftQuestion
