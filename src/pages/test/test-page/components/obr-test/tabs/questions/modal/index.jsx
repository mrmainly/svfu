import { Button, Form, InputNumber, List, Modal, Space } from 'antd'
import PropTypes from 'prop-types'
import { DeleteTwoTone } from '@ant-design/icons'

const QuestionSettingModal = ({visible, onCancel, field}) => {
    return(
        <Modal
            title={'Параметры раздела'}
            visible={visible === field.key}
            onOk={()=>onCancel(-1)}
            onCancel={()=>onCancel(-1)}
            afterClose={() => (console.log(`${field.name} close`))}
            width={1000}
        >
            <Form.List name={[field.name, 'criterion']} initialValue={[{}]}>
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
                                                <InputNumber placeholder={'Балл'}/>
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
                                                <InputNumber placeholder={'Балл'}/>
                                            </Form.Item>
                                        </Space>
                                    }
                                />
                                <Form.Item
                                    name={[field.name, 'response_score']}
                                    label={'Оценка'}
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
        </Modal>
    )
}

QuestionSettingModal.propTypes = {
    visible: PropTypes.number,
    onCancel: PropTypes.func,
    field: PropTypes.object
}

export default QuestionSettingModal