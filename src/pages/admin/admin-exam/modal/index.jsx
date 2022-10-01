import { Modal, message, Select, Form, Row, Col, Button, DatePicker, Spin } from 'antd'
import { PlusOutlined, DeleteTwoTone } from '@ant-design/icons'
import moment from 'moment'
import PropTypes from 'prop-types'

import {
    useGetAdminExamIDQuery,
    useGetUserRoleQuery,
    usePatchAdminExamMutation,
} from '../../../../services/admin/AdminExam'

const { Option } = Select

const AdminExamModal = ({ open, setOpen, dataList }) => {
    const [patchExam, { isLoading }] = usePatchAdminExamMutation()
    const { data: admData } = useGetAdminExamIDQuery({ id: dataList?.id })
    const { data: expertData } = useGetUserRoleQuery({ role: 'EXPERT' })
    const { data: moderatorData } = useGetUserRoleQuery({ role: 'MODERATOR' })

    const onSubmit = (data) => {
        patchExam({ id: dataList.id, body: data }).then((res) => {
            if (res.data) {
                message.success('Экзамен отредактирован')
                setOpen(false)
            } else {
                message.error(res.error.data.errors[0])
            }
            console.log(res)
        })
    }
    return (
        <Modal
            destroyOnClose={true}
            title="Редактирование запланированного экзамена"
            visible={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            footer={[
                <Button key="submit" type="primary" htmlType="submit" form="admedit-form">
                    Сохранить
                </Button>,
                <Button
                    key="back"
                    type="default"
                    style={{
                        background: '#FFF',
                    }}
                    onClick={() => setOpen(false)}
                >
                    Отмена
                </Button>,
            ]}
        >
            {isLoading && (
                <Spin
                    style={{
                        position: 'absolute',
                        top: '50%',
                        zIndex: 1,
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                    size="large"
                />
            )}
            <div style={{ opacity: isLoading ? 0.5 : 1 }}>
                <Form
                    layout="vertical"
                    initialValues={{
                        ['date_start']: moment(dataList?.date_start),
                        ['date_finish']: moment(dataList?.date_finish),
                        ['experts']: dataList?.experts,
                        ['moderators']: dataList?.moderators,
                        ['direction']: dataList?.direction,
                        ['unit']: dataList?.unit,
                        ['test_group']: dataList?.test_group,
                        ['main_expert_id']: dataList?.main_expert,
                        ['main_moderator_id']: dataList?.main_moderator,
                    }}
                    onFinish={onSubmit}
                    id="admedit-form"
                >
                    <Form.Item label="Квалификация" name="direction">
                        <Select
                            style={{
                                color: 'red!important',
                            }}
                            disabled
                            placeholder="Выберите тег"
                        >
                            <Option value={admData?.direction?.id}>
                                {admData?.direction.name}
                            </Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Тестирование" name="unit">
                        <Select open={false} disabled placeholder="Выберите тег">
                            <Option value={admData?.unit?.id}>{admData?.unit?.name}</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Группа аттестуемых" name="test_group">
                        <Select open={false} disabled placeholder="Выберите тег">
                            <Option value={admData?.test_group?.id}>
                                {admData?.test_group?.name}
                            </Option>
                        </Select>
                    </Form.Item>
                    <Row gutter={[16, 0]}>
                        <Col span={12}>
                            <Form.Item label="Дата начала тестирования" name="date_start">
                                <DatePicker
                                    disabled
                                    open={false}
                                    format="YYYY-MM-DD HH:mm:ss"
                                    minuteStep={15}
                                    secondStep={30}
                                    showTime={{
                                        defaultValue: moment('00:00:00', 'HH:mm:ss'),
                                    }}
                                    style={{ width: '100%', color: 'red' }}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Дата окончания тестирования" name="date_finish">
                                <DatePicker
                                    disabled
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
                                        key={field.key}
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Form.Item
                                            {...field}
                                            label={`Эксперт ${field.key + 1} `}
                                            name={index}
                                            style={{ width: '100%', marginRight: 20 }}
                                            required
                                        >
                                            <Select placeholder="Выберите эксперта">
                                                {expertData?.results?.map((item, index) => (
                                                    <Option key={index} value={item.id}>
                                                        {item.full_name}
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

                    <Form.Item required label="Председатель экспертов" name="main_expert_id">
                        <Select placeholder="Выберите председателя экспертов">
                            {expertData?.results?.map((item, index) => (
                                <Option key={index} value={item.id}>
                                    {item.full_name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.List name="moderators">
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
                                            label={`Модератор ${field.key + 1} `}
                                            name={index}
                                            style={{ width: '100%', marginRight: 20 }}
                                            required
                                        >
                                            <Select placeholder="Выберите модератора">
                                                {moderatorData?.results.map((item, index) => (
                                                    <Option key={index} value={item.id}>
                                                        {item.full_name}
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

                    <Form.Item required label="Председатель модераторов" name="main_moderator_id">
                        <Select placeholder="Выберите председателя модераторов">
                            {moderatorData?.results.map((item, index) => (
                                <Option key={index} value={item.id}>
                                    {item.full_name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

AdminExamModal.propTypes = {
    dataList: PropTypes.object,
    open: PropTypes.bool,
    setOpen: PropTypes.func,
}

export default AdminExamModal
