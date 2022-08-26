import { Modal, message, Input, Select, Form, Row, Col, InputNumber, DatePicker, Space } from 'antd'
import Item from 'antd/lib/list/Item'
import moment from 'moment'
import { MyButton } from '../../../../components'
import {
    useGetDirectionTuterQuery,
    useGetTestGroupQuery,
    useGetTestExamQuery,
    useGetUsersRoleQuery,
    usePostTestExamMutation,
} from '../../../../services/TutorService'
const { TextArea } = Input
const { Option } = Select

const ESAddModal = ({ open, setOpen, dataList }) => {
    const { data: dataTutor } = useGetDirectionTuterQuery()
    const { data: dataTestGroup } = useGetTestGroupQuery()
    const { data: dataTestExam } = useGetTestExamQuery()
    const { data: dataExpert } = useGetUsersRoleQuery({ role: 'EXPERT' })
    const { data: dataModerator } = useGetUsersRoleQuery({ role: 'MODERATOR' })
    const [postTestExam] = usePostTestExamMutation()
    const onSubmit = (data) => {
        console.log(data)

        postTestExam(data).then((res) => {
            if (res.data) {
                message.success('Квалификация создана')
                setOpen(false)
            } else {
                message.error(res.error.data.errors[0])
            }
            console.log(res)
        })
    }
    const onSearch = (value) => console.log(value)
    return (
        <div>
            <Modal
                style={{ top: 0 }}
                destroyOnClose={true}
                title="Создание квалификации"
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
                    <Form.Item required label="Квалификация" name="direction">
                        <Select placeholder="Выберите тег">
                            {dataTutor?.results.map((item, index) => (
                                <Option key={index} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item required label="Тестирование" name="unit">
                        <Select placeholder="Выберите тег">
                            {dataTestExam?.results.map((item, index) => (
                                <Option key={index} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item required label="Группа аттестуемых" name="test_group">
                        <Select placeholder="Выберите тег">
                            {dataTestGroup?.results.map((item, index) => (
                                <Option key={index} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Row gutter={[16, 0]}>
                        <Col span={12}>
                            <Form.Item required label="Дата начала тестирования" name="date_start">
                                <DatePicker
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
                    <Form.Item required label="Эксперт 1" name={['experts', 0]}>
                        <Select placeholder="Выберите тег">
                            {dataExpert?.results.map((item, index) => (
                                <Option key={index} value={item.id}>
                                    {item.username}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item required label="Эксперт 2" name={['experts', 1]}>
                        <Select placeholder="Выберите тег">
                            {dataExpert?.results.map((item, index) => (
                                <Option key={index} value={item.id}>
                                    {item.username}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item required label="Эксперт 3" name={['experts', 2]}>
                        <Select placeholder="Выберите тег">
                            {dataExpert?.results.map((item, index) => (
                                <Option key={index} value={item.id}>
                                    {item.username}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item required label="Председатель экспертов" name="main_expert">
                        <Select placeholder="Выберите тег">
                            {dataExpert?.results.map((item, index) => (
                                <Option key={index} value={item.id}>
                                    {item.username}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item required label="Модератор 1" name={['moderators', 0]}>
                        <Select placeholder="Выберите тег">
                            {dataModerator?.results.map((item, index) => (
                                <Option key={index} value={item.id}>
                                    {item.username}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item required label="Модератор 2" name={['moderators', 1]}>
                        <Select placeholder="Выберите тег">
                            {dataModerator?.results.map((item, index) => (
                                <Option key={index} value={item.id}>
                                    {item.username}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item required label="Модератор 3" name={['moderators', 2]}>
                        <Select placeholder="Выберите тег">
                            {dataModerator?.results.map((item, index) => (
                                <Option key={index} value={item.id}>
                                    {item.username}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item required label="Председатель модераторов" name="main_moderator">
                        <Select placeholder="Выберите тег">
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

export default ESAddModal
