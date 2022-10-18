import { Input, Form, Select } from 'antd'

const { Option } = Select
const { TextArea } = Input

const NewQuestion = () => {
    return (
        <div>
            <Form layout="vertical" id="qbadd-form">
                <Form.Item
                    label="Квалификация вопроса"
                    name="direction"
                    rules={[
                        {
                            required: true,
                            message: 'Выберите квалификацию',
                        },
                    ]}
                >
                    <Select
                        mode="multiple"
                        style={{
                            width: '100%',
                        }}
                    >
                        <Option></Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Тип вопроса"
                    name="technique"
                    rules={[
                        {
                            required: true,
                            message: 'Выберите тип вопроса',
                        },
                    ]}
                >
                    <Select
                        style={{
                            width: '100%',
                        }}
                    ></Select>
                </Form.Item>
                <Form.Item
                    label="Описание"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Напишите описание',
                        },
                    ]}
                >
                    <TextArea />
                </Form.Item>
                <Form.Item
                    label="Задание"
                    name="description"
                    rules={[
                        {
                            required: true,
                            message: 'Напишите задание',
                        },
                    ]}
                >
                    <TextArea />
                </Form.Item>
            </Form>
        </div>
    )
}

export default NewQuestion
