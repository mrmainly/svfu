import { useState } from 'react'
import { Modal, message, Select, Form, Row, Col, DatePicker, Button } from 'antd'
import { PlusOutlined, DeleteTwoTone } from '@ant-design/icons'
import moment from 'moment'
import PropTypes from 'prop-types'

import { MyButton } from '../../../../components'
import {
    useGetDirectionTuterQuery,
    useGetTestGroupDirectionQuery,
    useGetUnitQuery,
    useGetUsersRoleQuery,
    usePostTestExamMutation,
} from '../../../../services/TutorService'
const { Option } = Select

const ESAddModal = ({ open, setOpen }) => {
    const [direction, setDirection] = useState(0)
    const [testGroup, setTestGroup] = useState()
    const [unit, setUnit] = useState()
    const { data: dataTutor } = useGetDirectionTuterQuery()
    const { data: dataTestGroup } = useGetTestGroupDirectionQuery(
        { direction: direction },
        { skip: !direction }
    )
    const { data: dataUnit } = useGetUnitQuery({ direction: direction }, { skip: !direction })
    const { data: dataExpert } = useGetUsersRoleQuery({ role: 'EXPERT' })
    const { data: dataModerator } = useGetUsersRoleQuery({ role: 'MODERATOR' })
    const [postTestExam] = usePostTestExamMutation()
    const onSubmit = (data) => {
        data.date_start = moment(data.date_start._d).format('YYYY-MM-DD HH:mm:ss')
        data.date_finish = moment(data.date_finish._d).format('YYYY-MM-DD HH:mm:ss')
        data.test_group = testGroup
        data.unit = unit
        postTestExam(data).then((res) => {
            if (res.data) {
                message.success('Экзамен создан')
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
                title="Создание экзамена"
                visible={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={[
                    <MyButton key="submit" htmlType="submit" form="es-form">
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
                <Form layout="vertical" onFinish={onSubmit} id="es-form">
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Пожайлуста, выберите квалификацию!',
                            },
                        ]}
                        label="Квалификация"
                        name="direction"
                    >
                        <Select
                            placeholder="Выберите квалификацию"
                            onChange={(e) => {
                                setDirection(e)
                                setTestGroup()
                                setUnit()
                            }}
                        >
                            {dataTutor?.results.map((item, index) => (
                                <Option key={index} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Пожайлуста, выберите тестирование!',
                            },
                        ]}
                        label="Тестирование"
                    >
                        <Select
                            placeholder="Выберите тестирование"
                            onChange={(e) => setUnit(e)}
                            value={unit}
                        >
                            {dataUnit?.results.map((item, index) => (
                                <Option key={index} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Пожайлуста, выберите группу аттестуемых!',
                            },
                        ]}
                        label="Группа аттестуемых"
                    >
                        <Select
                            placeholder="Выберите группу аттестуемых"
                            onChange={(e) => setTestGroup(e)}
                            value={testGroup}
                        >
                            {dataTestGroup?.results.map((item, index) => (
                                <Option key={index} value={item.id}>
                                    {item.id} {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Row gutter={[16, 0]}>
                        <Col span={12}>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                        message: 'Пожайлуста, выберите дату начала тестирования!',
                                    },
                                ]}
                                label="Дата начала тестирования"
                                name="date_start"
                            >
                                <DatePicker
                                    placeholder="Выберите дату начала тестирования"
                                    format="YYYY-MM-DD HH:mm:ss"
                                    minuteStep={15}
                                    secondStep={30}
                                    showTime={{
                                        defaultValue: moment('00:00:00', 'HH:mm:ss'),
                                    }}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Пожайлуста, выберите дату окончания тестирования!',
                                    },
                                ]}
                                label="Дата окончания тестирования"
                                name="date_finish"
                            >
                                <DatePicker
                                    placeholder="Выберите дату окончания тестирования"
                                    format="YYYY-MM-DD HH:mm:ss"
                                    minuteStep={15}
                                    secondStep={30}
                                    showTime={{
                                        defaultValue: moment('00:00:00', 'HH:mm:ss'),
                                    }}
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.List
                        name="experts"
                        rules={[
                            {
                                validator: async (_, names) => {
                                    if (!names || names.length < 2) {
                                        return Promise.reject(new Error('Не менее 1 эксперта'))
                                    }
                                },
                            },
                        ]}
                    >
                        {(fields, { add, remove }, { errors }) => (
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
                                            label={`Эксперт ${index + 1} `}
                                            name={index}
                                            style={{ width: '100%', marginRight: 20 }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Пожайлуста, выберите эксперта!',
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Выберите эксперта">
                                                {dataExpert?.results.map((item, index) => (
                                                    <Option key={index} value={item.id}>
                                                        {item.username}
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
                                <Form.Item>
                                    <Button
                                        onClick={() => add()}
                                        block
                                        type="primary"
                                        ghost
                                        icon={<PlusOutlined />}
                                        style={{ width: 'max-content' }}
                                    >
                                        Добавить эксперта
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Пожайлуста, выберите председателя экспертов!',
                            },
                        ]}
                        label="Председатель экспертов"
                        name="main_expert"
                    >
                        <Select placeholder="Выберите председателя экспертов">
                            {dataExpert?.results.map((item, index) => (
                                <Option key={index} value={item.id}>
                                    {item.username}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.List
                        name="moderators"
                        rules={[
                            {
                                validator: async (_, names) => {
                                    if (!names || names.length < 2) {
                                        return Promise.reject(new Error('Не менее 1 модератора'))
                                    }
                                },
                            },
                        ]}
                    >
                        {(fields, { add, remove }, { errors }) => (
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
                                            label={`Модератор ${index + 1} `}
                                            name={index}
                                            style={{ width: '100%', marginRight: 20 }}
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Пожайлуста, выберите модератора!',
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Выберите модератора">
                                                {dataModerator?.results.map((item, index) => (
                                                    <Option key={index} value={item.id}>
                                                        {item.username}
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
                                <Form.Item>
                                    <Button
                                        onClick={() => add()}
                                        block
                                        type="primary"
                                        ghost
                                        icon={<PlusOutlined />}
                                        style={{ width: 'max-content' }}
                                    >
                                        Добавить модератора
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Пожайлуста, выберите председателя модераторов!',
                            },
                        ]}
                        label="Председатель модераторов"
                        name="main_moderator"
                    >
                        <Select placeholder="Выберите председателя модераторов">
                            {dataModerator?.results.map((item, index) => (
                                <Option key={index} value={item.id}>
                                    {item.username}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

ESAddModal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
}

export default ESAddModal
