import { useState, useEffect } from 'react'
import { Modal, message, Select, Form, Button } from 'antd'
import { PlusOutlined, DeleteTwoTone } from '@ant-design/icons'
import PropTypes from 'prop-types'

import { MyButton } from '../../../../../components'
import {
    usePatchExaminationGroupsMutation,
    useDeleteExaminationGroupsMutation,
} from '../../../../../services/tutor/ExaminationGroups'
import { useGetUserIdQuery } from '../../../../../services/tutor/Tools'

const { Option } = Select

const EgEditModal = ({ open, setOpen, direction, testGroup }) => {
    const [testerId, setTesterId] = useState(null)
    const [testGroupId, setTestGroupId] = useState(0)
    const [value, setValue] = useState('')

    const [patchTestGroup] = usePatchExaminationGroupsMutation()
    const [deleteTestGroup] = useDeleteExaminationGroupsMutation()
    const { data: testers } = useGetUserIdQuery(
        { id: testerId, full_name: value },
        { skip: !testerId }
    )

    useEffect(() => {
        setTesterId(testGroup?.direction.id)
        setTestGroupId(testGroup?.id)
    }, [testGroup])

    const onSubmit = (data) => {
        patchTestGroup({ body: data, id: testGroupId }).then((res) => {
            if (res.data) {
                message.success('Группа обновлена')
                setOpen(false)
            } else {
                message.error(res.error.data.errors[0])
            }
        })
    }

    const handleSearchText = (searchText) => {
        setValue(searchText)
    }

    return (
        <div>
            <Modal
                destroyOnClose={true}
                title="Редактирование группы"
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
                            deleteTestGroup(testGroup?.id).then(() => {
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
                                {fields.map((field, index) => (
                                    <div
                                        key={field.key}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Form.Item
                                            label={`Аттестуемый ${index + 1} `}
                                            name={index}
                                            style={{ width: '100%', marginRight: 20 }}
                                            required
                                        >
                                            <Select
                                                placeholder="Выберите аттестуемого"
                                                showSearch
                                                optionFilterProp="children"
                                                onSearch={handleSearchText}
                                            >
                                                {testers?.map((item, index) => (
                                                    <Option
                                                        key={index}
                                                        value={item.user.id}
                                                        disabled={
                                                            item?.user?.is_active ? false : true
                                                        }
                                                    >
                                                        {item.user.last_name} {item.user.first_name}{' '}
                                                        {item.user.patronymic}
                                                        {!item.user.is_active && (
                                                            <span
                                                                style={{
                                                                    color: '#f28585',
                                                                    marginLeft: 5,
                                                                }}
                                                            >
                                                                заблокирован
                                                            </span>
                                                        )}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        <DeleteTwoTone
                                            twoToneColor="#EB5757"
                                            onClick={() => remove(field.name)}
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

EgEditModal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    direction: PropTypes.array,
    testGroup: PropTypes.object,
}

export default EgEditModal
