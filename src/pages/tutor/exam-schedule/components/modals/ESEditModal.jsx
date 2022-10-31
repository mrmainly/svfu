import { useState, useEffect } from 'react'
import { Modal, message, Select, Form, Row, Col, Button, DatePicker } from 'antd'
import { PlusOutlined, DeleteTwoTone } from '@ant-design/icons'
import moment from 'moment'
import PropTypes from 'prop-types'

import { MyButton } from '../../../../../components'
import {
    useGetExaminationGroupsDirectionQuery,
    useGetTestingListQuery,
    useGetUsersRoleQuery,
    usePatchExamScheduleMutation,
} from '../../../../../services/tutor/ExamSchedule'
import { useGetDirectionTuterQuery } from '../../../../../services/tutor/Tools'

const { Option } = Select

const ESEditModal = ({ open, setOpen, dataList, handleOpen }) => {
    const [direction, setDirection] = useState(dataList?.direction)
    const [testGroup, setTestGroup] = useState(dataList?.test_group)
    const [unit, setUnit] = useState(dataList?.unit)
    const { data: dataTutor } = useGetDirectionTuterQuery()
    const { data: dataTestGroup } = useGetExaminationGroupsDirectionQuery(
        { direction: direction },
        { skip: !direction }
    )
    const { data: dataUnit } = useGetTestingListQuery(
        { direction: direction },
        { skip: !direction }
    )
    const { data: dataExpert } = useGetUsersRoleQuery({ role: 'EXPERT' })
    const { data: dataModerator } = useGetUsersRoleQuery({ role: 'MODERATOR' })
    const [patchTestExam] = usePatchExamScheduleMutation()

    useEffect(() => {
        setDirection(dataList?.direction)
        setTestGroup(dataList?.test_group)
        setUnit(dataList?.unit)
    }, [dataList])
    const onSubmit = (data) => {
        data.date_start = moment(data.date_start._d).format('YYYY-MM-DD HH:mm:ss')
        data.date_finish = moment(data.date_finish._d).format('YYYY-MM-DD HH:mm:ss')
        data.test_group = testGroup
        data.unit = unit
        patchTestExam({ id: dataList.id, body: data }).then((res) => {
            if (res.data) {
                message.success('Экзамен отредактирован')
                setOpen(false)
            } else {
                message.error(res.error.data.errors[0])
            }
        })
    }
    const close = () => {
        setOpen(false)
    }

    return (
        <div>
            <Modal
                destroyOnClose={true}
                title="Редактирование запланированного экзамена"
                visible={open}
                onCancel={() => close()}
                style={{ top: 20 }}
                footer={[
                    <Button
                        key="submit"
                        htmlType="submit"
                        form="ese-form"
                        type="primary"
                        size="large"
                        disabled={dataList?.exam_status === 'WAITING' ? false : true}
                    >
                        Сохранить
                    </Button>,
                    <Button
                        key="delete"
                        type="danger"
                        size="large"
                        disabled={dataList?.exam_status === 'IN_PROGRESS' ? false : true}
                        onClick={handleOpen}
                    >
                        Отменить
                    </Button>,
                    <MyButton
                        key="back"
                        type="default"
                        style={{
                            background: '#FFF',
                        }}
                        onClick={() => close()}
                    >
                        Отмена
                    </MyButton>,
                ]}
            >
                <Form
                    layout="vertical"
                    initialValues={{
                        ['date_start']: moment(dataList?.date_start),
                        ['date_finish']: moment(dataList?.date_finish),
                        ['experts']: dataList?.experts,
                        ['moderators']: dataList?.moderators,
                        ['direction']: dataList?.direction,
                        ['main_expert']: dataList?.main_expert,
                        ['main_moderator']: dataList?.main_moderator,
                    }}
                    onFinish={onSubmit}
                    id="ese-form"
                    disabled={dataList?.exam_status === 'WAITING' ? false : true}
                >
                    <Form.Item required label="Квалификация" name="direction">
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
                    <Form.Item required label="Тестирование">
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
                                message: 'Please confirm your password!',
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
                            <Form.Item required label="Дата начала тестирования" name="date_start">
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
                                required
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
                    <Form.List name="experts">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field, index) => (
                                    <div
                                        key={index}
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
                                            required
                                        >
                                            <Select placeholder="Выберите эксперта">
                                                {dataExpert?.results.map((item, index) => (
                                                    <Option key={index} value={item.id}>
                                                        {item.username} {item.full_name}
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
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Form.Item required label="Председатель экспертов" name="main_expert">
                        <Select placeholder="Выберите председателя экспертов">
                            {dataExpert?.results.map((item, index) => (
                                <Option key={index} value={item.id}>
                                    {item.username}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.List name="moderators">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field, index) => (
                                    <div
                                        key={index}
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
                                            required
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
                                </Form.Item>
                            </>
                        )}
                    </Form.List>

                    <Form.Item required label="Председатель модераторов" name="main_moderator">
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

ESEditModal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    dataList: PropTypes.object,
    handleOpen: PropTypes.func,
}

export default ESEditModal
