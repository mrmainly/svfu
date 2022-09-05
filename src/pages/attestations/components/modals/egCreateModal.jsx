import { useState } from 'react'
import { Modal, message, Select, Form, Button } from 'antd'
import { PlusOutlined, DeleteTwoTone } from '@ant-design/icons'

import { MyButton } from '../../../../components'
import {
    usePostTesterGroupMutation,
    useGetApplicationUserQuery,
} from '../../../../services/TutorService'

const { Option } = Select

const EgCreateModal = ({ open, setOpen, direction }) => {
    const [form] = Form.useForm()
    const [postTestGroup] = usePostTesterGroupMutation()
    const [id, setId] = useState(0)
    const { data: tester } = useGetApplicationUserQuery({ id: id }, { skip: !id })

    const onSubmit = (data) => {
        postTestGroup(data).then((res) => {
            if (res.data) {
                message.success('Группа создана')
                form.resetFields()
                setOpen(false)
            } else {
                message.error(res.error.data.errors[0])
            }
        })
    }
    return (
        <div>
            <Modal
                destroyOnClose={true}
                title="Создание группы"
                visible={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={[
                    <MyButton key="submit" htmlType="submit" form="egCreate-form">
                        Сохранить
                    </MyButton>,
                    <MyButton
                        key="back"
                        type="default"
                        style={{
                            background: '#FFF',
                        }}
                        onClick={() => setOpen(false)}
                    >
                        Отмена
                    </MyButton>,
                ]}
            >
                <Form form={form} layout="vertical" onFinish={onSubmit} id="egCreate-form">
                    <Form.Item label="Квалификация" name="direction">
                        <Select
                            placeholder="Выберите тег"
                            onChange={(e) => {
                                setId(e)
                                form.setFieldsValue({
                                    testers: '',
                                })
                            }}
                        >
                            {direction
                                ? direction.map((item, index) => (
                                      <Option key={index} value={item.id}>
                                          {item.name}
                                      </Option>
                                  ))
                                : ''}
                        </Select>
                    </Form.Item>
                    {/* <Form.Item label={`Аттестуемый 1`} name={`tester_1`} required>
                        <Select placeholder="Выберите аттестуемого">
                            {tester
                                ? tester[0]?.testers?.map((item, index) => (
                                      <Option key={index} value={item.id}>
                                          {item.last_name} {item.first_name} {item.patronymic}
                                      </Option>
                                  ))
                                : ''}
                        </Select>
                    </Form.Item> */}

                    <Form.List name="testers">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <div
                                        key={key}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Form.Item
                                            label={`Аттестуемый ${key + 1} `}
                                            name={key}
                                            style={{ width: '100%', marginRight: 20 }}
                                            required
                                        >
                                            <Select placeholder="Выберите аттестуемого">
                                                {tester
                                                    ? tester.results?.map((item, index) => (
                                                          <Option key={index} value={item.user.id}>
                                                              {item.user.last_name}{' '}
                                                              {item.user.first_name}{' '}
                                                              {item.user.patronymic}
                                                          </Option>
                                                      ))
                                                    : ''}
                                            </Select>
                                        </Form.Item>
                                        <DeleteTwoTone
                                            twoToneColor="#EB5757"
                                            onClick={() => remove(name)}
                                        />
                                    </div>
                                ))}
                                <Button
                                    onClick={() => add()}
                                    block
                                    type="primary"
                                    ghost
                                    icon={<PlusOutlined />}
                                    style={{ width: 'max-content' }}
                                >
                                    Добавить аттестуемого
                                </Button>
                            </>
                        )}
                    </Form.List>
                </Form>
            </Modal>
        </div>
    )
}

export default EgCreateModal
