import { useState, useEffect } from 'react'
import { Modal, message, Select, Form, Button, Spin } from 'antd'
import { PlusOutlined, DeleteTwoTone } from '@ant-design/icons'

import { MyButton } from '../../../../components'
import {
    usePatchTesterGroupMutation,
    // useGetTestGroupIdQuery,
    useDeleteTesterGroupMutation,
    useGetApplicationUserQuery,
} from '../../../../services/TutorService'

const { Option } = Select

const EgEditModal = ({ open, setOpen, direction, testGroup }) => {
    const [form] = Form.useForm()
    const [patchTestGroup] = usePatchTesterGroupMutation()
    const [deleteTestGroup] = useDeleteTesterGroupMutation()
    const [testerId, setTesterId] = useState(0)
    const [testGroupId, setTestGroupId] = useState(0)
    // const {
    //     data: getTestGroupId,
    //     isFetching,
    //     isLoading,
    // } = useGetTestGroupIdQuery(id, {
    //     skip: id,
    // })
    const { data: tester } = useGetApplicationUserQuery({ id: testerId }, { skip: !testerId })
    useEffect(() => {
        setTesterId(testGroup?.direction.id)
        setTestGroupId(testGroup?.id)
    }, [testGroup])
    const onSubmit = (data) => {
        patchTestGroup({ body: data, id: testGroupId }).then((res) => {
            if (res.data) {
                message.success('Группа обновлена')
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
                title="Редактирование квалификации"
                visible={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={[
                    <MyButton key="submit" htmlType="submit" form="egEdit-form">
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
                    <MyButton
                        key="delete"
                        type="primary"
                        style={{
                            background: ' #DC3545',
                            borderColor: '#DC3545',
                        }}
                        onClick={() =>
                            deleteTestGroup(testGroup?.id).then((res) => {
                                setOpen(false)
                                message.success('Группа удалена')
                            })
                        }
                    >
                        Удалить
                    </MyButton>,
                ]}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onSubmit}
                    id="egEdit-form"
                    name="dynamic_form_item"
                    initialValues={{
                        ['direction']: testGroup?.direction?.id,
                        ['testers']: testGroup?.testers.map((item) => {
                            return item.id
                        }),
                    }}
                >
                    <Form.Item label="Квалификация" name="direction">
                        <Select
                            placeholder="Выберите тег"
                            onChange={(e) => {
                                setTesterId(e)
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

export default EgEditModal
