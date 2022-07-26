import { useState } from 'react'
import { Modal, Select, Form, Row, Col, DatePicker, Button, message } from 'antd'
import { PlusOutlined, DeleteTwoTone } from '@ant-design/icons'
import moment from 'moment'
import PropTypes from 'prop-types'

import { MyButton } from '../../../../../components'
import {
    //  useGetExaminationGroupsDirectionQuery,
    useGetExaminationsDirectionQuery,
    useGetTestingListQuery,
    useGetUsersRoleQuery,
    usePostExamScheduleMutation,
} from '../../../../../services/tutor/ExamSchedule'
import { useGetDirectionTuterQuery } from '../../../../../services/tutor/Tools'

const { Option } = Select

const ESAddModal = ({ open, setOpen }) => {
    const [direction, setDirection] = useState()
    const [testGroup, setTestGroup] = useState()
    const [unit, setUnit] = useState()
    const { data: dataTutor } = useGetDirectionTuterQuery()
    //  const { data: dataTestGroup } = useGetExaminationGroupsDirectionQuery(
    //      { direction: direction },
    //      { skip: !direction }
    //  )
    const { data: dataExaminations } = useGetExaminationsDirectionQuery({ direction: direction })
    const { data: dataUnit } = useGetTestingListQuery(
        { direction: direction },
        { skip: !direction }
    )
    const { data: dataExpert } = useGetUsersRoleQuery({ role: 'EXPERT' })
    const { data: dataModerator } = useGetUsersRoleQuery({ role: 'MODERATOR' })
    const [postTestExam] = usePostExamScheduleMutation()
    const onSubmit = (data) => {
        data.date_start = moment(data.date_start._d).format('YYYY-MM-DD HH:mm:ss')
        data.date_finish = moment(data.date_finish._d).format('YYYY-MM-DD HH:mm:ss')
        data.test_group = testGroup
        data.unit = unit
        console.log(data)
        postTestExam(data).then((res) => {
            if (res.data) {
                message.success('Экзамен создан')
                setOpen(false)
            } else {
                message.error('Экзамен не создан')
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
                    <Button
                        key="back"
                        size="large"
                        style={{
                            background: '#FFF',
                        }}
                        onClick={() => setOpen(false)}
                    >
                        Отмена
                    </Button>,
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
                                    {item.name}({item.unit_type})
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Пожайлуста, выберите аттестуемых!',
                            },
                        ]}
                        label="Аттестуемые"
                    >
                        <Select
                            mode="multiple"
                            placeholder="Выберите аттестуемых"
                            onChange={(e) => setTestGroup(e)}
                            value={testGroup}
                        >
                            {dataExaminations?.map((item, index) => (
                                <Option key={index} value={item.user.id}>
                                    {item.user.id} {item.user.full_name}
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
                        initialValue={[{}]}
                        name="experts"
                        rules={[
                            {
                                validator: async (_, names) => {
                                    if (!names || names.length < 1) {
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
                                                {dataExpert?.map((item, index) => (
                                                    <Option key={index} value={item.id}>
                                                        {item.username}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <DeleteTwoTone
                                                twoToneColor="#EB5757"
                                                onClick={() => remove(field.name)}
                                            />
                                        ) : null}
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
                            {dataExpert?.map((item, index) => (
                                <Option key={index} value={item.id}>
                                    {item.username}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.List
                        initialValue={[{}]}
                        name="moderators"
                        rules={[
                            {
                                validator: async (_, names) => {
                                    if (!names || names.length < 1) {
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
                                                {dataModerator?.map((item, index) => (
                                                    <Option key={index} value={item.id}>
                                                        {item.username}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                        {fields.length > 1 ? (
                                            <DeleteTwoTone
                                                twoToneColor="#EB5757"
                                                onClick={() => remove(field.name)}
                                            />
                                        ) : null}
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
                            {dataModerator?.map((item, index) => (
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
