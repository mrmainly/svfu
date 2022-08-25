import { Modal, message, Select, Form, Button, Spin } from 'antd'
import { PlusOutlined, DeleteTwoTone } from '@ant-design/icons'

import { MyButton } from '../../../../components'
import {
    usePatchTesterGroupMutation,
    useGetTestGroupIdQuery,
} from '../../../../services/TutorService'

const { Option } = Select

const EgEditModal = ({ open, setOpen, tester, direction, id }) => {
    const [patchTestGroup] = usePatchTesterGroupMutation()
    const { data: getTestGroupId, isFetching, isLoading } = useGetTestGroupIdQuery(id)

    const onSubmit = (data) => {
        patchTestGroup({ body: data, id: id }).then((res) => {
            if (res.data) {
                message.success('Группа обновлена')
                setOpen(false)
            } else {
                message.error(res.error.data.errors[0])
            }
        })
    }

    if (isLoading) {
        return <></>
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
                ]}
            >
                <Form
                    layout="vertical"
                    onFinish={onSubmit}
                    id="egEdit-form"
                    name="dynamic_form_item"
                    initialValues={{
                        direction: getTestGroupId?.direction?.id,
                        testers: getTestGroupId?.testers.map((item) => {
                            return item.id
                        }),
                    }}
                >
                    <Form.Item label="Квалификация" name="direction">
                        <Select placeholder="Выберите тег">
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
                                                    ? tester.map((item, index) => (
                                                          <Option key={index} value={item.id}>
                                                              {item.last_name} {item.first_name}{' '}
                                                              {item.patronymic}
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

export default EgEditModal
