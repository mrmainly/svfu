import { useParams } from 'react-router-dom'

import { Modal, message, Select, Form, Typography } from 'antd'
import Item from 'antd/lib/list/Item'
import moment from 'moment'

import { MyButton } from '../../../../../components'

import { usePatchUserMutation } from '../../../../../services/AdminService'

const { Option } = Select
const { Text } = Typography

const QualificationModal = ({ open, setOpen, data }) => {
    const params = useParams()
    const [patchRole] = usePatchUserMutation()
    const options = [
        { value: 'ADMIN', label: 'Администратор' },
        { value: 'MODERATOR', label: 'Модератор' },
        { value: 'EXPERT', label: 'Эксперт' },
        { value: 'TUTOR', label: 'Тьютор' },
        { value: 'CONSTRUCTOR', label: 'Менеджер оценочных средств' },
        { value: 'LPR', label: 'Лицо принимающее решение' },
        { value: 'TESTER', label: 'Аттестуемый' },
    ]
    const onSubmit = (data) => {
        patchRole({ id: params.id, body: data }).then((res) => {
            if (res.data) {
                message.success('Роль изменена')
                setOpen(false)
            } else {
                message.error(res.error.data.errors[0])
            }
        })
    }
    return (
        <div>
            <Modal
                title="Изменение роли документа"
                destroyOnClose={true}
                visible={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={[
                    <MyButton key="submit" htmlType="submit" form="role-change-form">
                        Сохранить
                    </MyButton>,
                    <MyButton
                        key="back"
                        type="default"
                        style={{ background: '#FFF' }}
                        onClick={() => setOpen(false)}
                    >
                        Отмена
                    </MyButton>,
                ]}
            >
                <Form
                    layout="vertical"
                    onFinish={onSubmit}
                    id="role-change-form"
                    initialValues={{
                        ['role']: data,
                    }}
                >
                    <Form.Item
                        label={
                            <Text
                                style={{
                                    fontWeight: 600,
                                    fontSize: 16,
                                }}
                            >
                                Роль
                            </Text>
                        }
                        name="role"
                        rules={[
                            {
                                required: true,
                                message: 'Выберите роль',
                            },
                        ]}
                        labelCol={{ span: 24 }}
                    >
                        <Select
                            style={{
                                width: '100%',
                            }}
                        >
                            {options.map((item, index) => (
                                <Option value={item.value} key={index}>
                                    {item.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default QualificationModal
