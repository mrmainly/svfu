import { MyButton } from '../../../../../components'

import { Modal, Form, Input, DatePicker, Select, message, Typography } from 'antd'
import PropTypes from 'prop-types'

import { usePostUserMutation } from '../../../../../services/admin/AdminUsers'
import { roles } from './UserChangeModalData'
import moment from 'moment'

const { Text } = Typography
const { Option } = Select
const { TextArea } = Input

const UserAddModal = ({ open, setOpen }) => {
    const [postUser] = usePostUserMutation()

    const inputs = [
        {
            label: 'Логин',
            name: 'username',
            required: true,
            requiredText: 'Введите логин',
        },
        {
            label: 'Пароль',
            name: 'password',
            required: true,
            requiredText: 'Введите пароль',
        },
        {
            label: 'Телефон',
            name: 'phone',
            required: true,
            requiredText: 'Введите ваш телефон',
        },
        {
            label: 'Электронная почта',
            name: 'email',
            required: true,
            requiredText: 'Введите электронную почту',
        },
        {
            label: 'Фамилия',
            name: 'last_name',
            required: false,
            requiredText: 'Введите фамилию',
        },
        {
            label: 'Имя',
            name: 'first_name',
            required: false,
            requiredText: 'Введите имя',
        },
        {
            label: 'Отчество',
            name: 'patronymic',
            required: false,
            requiredText: 'Введите отчество',
        },
        {
            label: 'Дата рождения',
            name: 'birth_date',
            required: false,
            type: 'date',
            requiredText: 'Введите дату рождения',
            format: 'DD.MM.YYYY',
        },
        {
            label: 'ИНН',
            name: 'inn',
            required: false,
            requiredText: 'Введите ваш ИНН',
            pattern:
                /^(([0-9]{10}([0-9]{2})?)|([0-9]{4}-[0-9]{5}-[0-9]{1})|([0-9]{4}-[0-9]{6}-[0-9]{2}))$/,
            pattern_message: 'Проверьте правильность ИНН',
        },
        {
            label: 'СНИЛС',
            name: 'snils',
            required: false,
            requiredText: 'Введите ваш СНИЛС',
            pattern: /^(([0-9]{3}-[0-9]{3}-[0-9]{3}-[0-9]{2})|([0-9]{11}))$/,
            pattern_message: 'Проверьте правильность СНИЛСа',
        },
        {
            label: 'VK',
            name: 'vk',
            required: false,
            requiredText: 'Введите профиль VK',
        },
        {
            label: 'Одноклассники',
            name: 'ok',
            required: false,
            requiredText: 'Введите профиль Одноклассники',
        },
        {
            label: 'Youtube',
            name: 'youtube',
            required: false,
            requiredText: 'Введите профиль YouTube',
        },
    ]

    const bioInput = [
        {
            label: 'Моя биография',
            name: 'my_biography',
            required: false,
            placeholder: 'Напишите биографию',
        },
        {
            label: 'Мои обязанности',
            name: 'my_responsibilities',
            required: false,
            placeholder: 'Напишите о своих обязанностях',
        },
        {
            label: 'Достижения и поощрения',
            name: 'rewards',
            required: false,
            placeholder: 'Напишите о своих достижениях и поощрениях',
        },
        {
            label: 'Научные интересы',
            name: 'scientific_interests',
            required: false,
            placeholder: 'Напишите о научных интересах',
        },
        {
            label: 'Научные гранты',
            name: 'scientific_grants',
            required: false,
            placeholder: 'Напишите о научных грантах',
        },
        {
            label: 'Проведение конференций',
            name: 'holding_conferences',
            required: false,
            placeholder: 'Напишите о проведении конференций',
        },
        {
            label: 'Участие в конференциях, симпозиумах',
            name: 'participation_conferences',
            required: false,
            placeholder: 'Напишите о своих участиях в конференциях, симпозиумах',
        },
        {
            label: 'Почетные звания',
            name: 'honoured_title',
            required: false,
            placeholder: 'Напишите о своих почетных званиях',
        },
        {
            label: 'Научно-общественная деятельность',
            name: 'ssa',
            required: false,
            placeholder: 'Напишите о научно-общественной деятельности',
        },
    ]

    const onSubmit = (data) => {
        if (data.birth_date) {
            data.birth_date = moment(data.birth_date._d).format('YYYY-MM-DD')
        }

        postUser({ body: data }).then((res) => {
            if (res.data) {
                message.success('Пользователь создан')
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
                    <MyButton key="submit" htmlType="submit" form="useradd-form">
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
                        ['role']: '',
                    }}
                    layout="vertical"
                    onFinish={onSubmit}
                    id="useradd-form"
                    scrollToFirstError
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
                                          {
                                              required: item.required,
                                              message: item.requiredText ? item.requiredText : '',
                                          },
                                      ]
                                    : [
                                          {
                                              required: item.required,
                                              message: item.requiredText ? item.requiredText : '',
                                          },
                                      ]
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
                            rules={[
                                {
                                    required: item.required,
                                    message: item.requiredText,
                                },
                            ]}
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
                                required: true,
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

UserAddModal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
}

export default UserAddModal
