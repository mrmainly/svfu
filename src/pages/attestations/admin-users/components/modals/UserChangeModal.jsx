import { useParams } from 'react-router-dom'

import { Modal, message, Select, Form, Typography, Input, DatePicker } from 'antd'
import moment from 'moment'

import { inputs, bioInput, roles } from './UserChangeModalData'
import { MyButton } from '../../../../../components'

import { usePatchUserMutation } from '../../../../../services/AdminService'

const { Option } = Select
const { Text } = Typography
const { TextArea } = Input

const UserChangeModal = ({ open, setOpen, data }) => {
    const params = useParams()
    const [patchUser] = usePatchUserMutation()
    const onSubmit = (data) => {
        if (data.birth_date) {
            data.birth_date = moment(data.birth_date._d).format('YYYY-MM-DD')
        }
        patchUser({ id: params.id, body: data }).then((res) => {
            if (res.data) {
                message.success('Пользователь изменен')
                setOpen(false)
            } else {
                message.error(res.error.data.errors[0])
            }
        })
    }

    return (
        <div>
            <Modal
                style={{ top: 0 }}
                destroyOnClose={true}
                title="Создание пользователя"
                visible={open}
                onOk={() => {
                    setOpen(false)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
                footer={[
                    <MyButton key="submit" htmlType="submit" form="userchange-form">
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
                    initialValues={{
                        ['last_name']: data?.last_name,
                        ['first_name']: data?.first_name,
                        ['patronymic']: data?.patronymic,
                        ['phone']: data?.phone,
                        ['email']: data?.email,
                        ['birth_date']: moment(data?.birth_date),
                        ['inn']: data?.inn,
                        ['snils']: data?.snils,
                        ['vk']: data?.vk,
                        ['ok']: data?.ok,
                        ['my_biography']: data?.my_biography,
                        ['my_responsibilities']: data?.my_responsibilities,
                        ['rewards']: data?.rewards,
                        ['scientific_interests']: data?.scientific_interests,
                        ['scientific_grants']: data?.scientific_grants,
                        ['holding_conferences']: data?.holding_conferences,
                        ['participation_conferences']: data?.participation_conferences,
                        ['honoured_title']: data?.honoured_title,
                        ['ssa']: data?.ssa,
                        ['role']: data?.role ? data?.role : '',
                    }}
                    layout="vertical"
                    onFinish={onSubmit}
                    id="userchange-form"
                >
                    {inputs.map((item, index) => (
                        <Form.Item
                            key={index}
                            label={
                                <Text
                                    style={{
                                        fontWeight: 600,
                                        fontSize: 16,
                                    }}
                                >
                                    {item.label}
                                </Text>
                            }
                            name={item.name}
                            rules={
                                item?.pattern
                                    ? [
                                          {
                                              pattern: item.pattern,
                                              message: item.pattern_message,
                                          },
                                      ]
                                    : []
                            }
                            labelCol={{ span: 24 }}
                        >
                            {item.type !== 'date' ? (
                                <Input
                                    placeholder={item.requiredText}
                                    size="medium"
                                    type={item.type ? item.type : ''}
                                />
                            ) : (
                                <DatePicker
                                    style={{ width: '100%' }}
                                    placeholder={item.requiredText}
                                    format={item.format}
                                />
                            )}
                        </Form.Item>
                    ))}
                    {bioInput.map((item, index) => (
                        <Form.Item
                            key={index}
                            label={
                                <Text
                                    style={{
                                        fontWeight: 600,
                                        fontSize: 16,
                                    }}
                                >
                                    {item.label}
                                </Text>
                            }
                            name={item.name}
                            labelCol={{ span: 24 }}
                        >
                            <TextArea
                                placeholder={item.placeholder}
                                rows={4}
                                type={item.type ? item.type : ''}
                            />
                        </Form.Item>
                    ))}
                    <Form.Item
                        label={
                            <Text
                                style={{
                                    fontWeight: 600,
                                    fontSize: 16,
                                }}
                            >
                                Общий стаж работы
                            </Text>
                        }
                        name={'total_experience'}
                        labelCol={{ span: 24 }}
                    >
                        <Input placeholder="Общий стаж работы" size="medium" type="number" />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text
                                style={{
                                    fontWeight: 600,
                                    fontSize: 16,
                                }}
                            >
                                Стаж работы по специальности
                            </Text>
                        }
                        name={'specialty_experience'}
                        labelCol={{ span: 24 }}
                    >
                        <Input
                            placeholder="Стаж работы по специальности"
                            size="medium"
                            type="number"
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text
                                style={{
                                    fontWeight: 600,
                                    fontSize: 16,
                                }}
                            >
                                Должность
                            </Text>
                        }
                        name={'post'}
                        labelCol={{ span: 24 }}
                    >
                        <Input placeholder="Должность" size="medium" />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text
                                style={{
                                    fontWeight: 600,
                                    fontSize: 16,
                                }}
                            >
                                Выберите роль
                            </Text>
                        }
                        name={'role'}
                        rules={[
                            {
                                message: 'Выберите роль',
                            },
                        ]}
                        labelCol={{ span: 24 }}
                    >
                        <Select>
                            <Option disabled value="">
                                Выберите роль
                            </Option>
                            {roles.map((item, index) => (
                                <Option value={item.value} key={index}>
                                    {item.text}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default UserChangeModal
