import { useState, useEffect } from 'react'
import { Modal, message, Input, Select, Form, Row, Col, Button } from 'antd'
import { PlusOutlined, DeleteTwoTone } from '@ant-design/icons'

import { MyButton } from '../../../../components'
import { useGetDirectionQuery } from '../../../../services/TutorService'

const { Option } = Select

const EgCreateModal = ({ open, setOpen }) => {
    const { data: directions, isLoading } = useGetDirectionQuery('')

    return (
        <div>
            <Modal
                destroyOnClose={true}
                title="Редактирование квалификации"
                visible={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={[
                    <MyButton key="submit" htmlType="submit" form="aqedit-form">
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
                <Form
                    layout="vertical"
                    // onFinish={onSubmit}
                    id="aqedit-form"
                >
                    <Form.Item label="Квалификация" name="tag_direction">
                        <Select placeholder="Выберите тег">
                            {/* {data?.map((item, index) => (
                                <Option key={index} value={item.id}>
                                    {item.name}
                                </Option>
                            ))} */}
                        </Select>
                    </Form.Item>
                    <Form.Item label={`Аттестуемый 1`} name="description" required>
                        <Input placeholder="Выберите аттестуемого" />
                    </Form.Item>
                    <Form.List name="variant">
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
                                            label={`Аттестуемый ${key + 2} `}
                                            name="description"
                                            style={{ width: '100%', marginRight: 20 }}
                                            required
                                        >
                                            <Input placeholder="Выберите аттестуемого" />
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
                                    Добавить вариант ответа
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
