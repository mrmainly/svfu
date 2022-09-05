import {
    Modal,
    message,
    Input,
    Select,
    Form,
    Row,
    Col,
    InputNumber,
    Button,
    DatePicker,
    Space,
} from 'antd'
import { PlusOutlined, DeleteTwoTone } from '@ant-design/icons'

import Item from 'antd/lib/list/Item'
import moment from 'moment'

import { MyButton } from '../../../../components'
import {
    useGetDirectionTuterQuery,
    useGetTestGroupQuery,
    useGetUnitQuery,
    useGetUsersRoleQuery,
    usePatchTestExamMutation,
} from '../../../../services/TutorService'
const { TextArea } = Input
const { Option } = Select

const ESEditModal = ({ open, setOpen, dataList }) => {
    const { data: dataTutor } = useGetDirectionTuterQuery()
    const { data: dataTestGroup } = useGetTestGroupQuery()
    const { data: dataUnit } = useGetUnitQuery()
    const { data: dataExpert } = useGetUsersRoleQuery({ role: 'EXPERT' })
    const { data: dataModerator } = useGetUsersRoleQuery({ role: 'MODERATOR' })
    const [patchTestExam] = usePatchTestExamMutation()
    const onSubmit = (data) => {
        data.date_start = moment(data.date_start._d).format('YYYY-MM-DD HH:mm:ss')
        data.date_finish = moment(data.date_finish._d).format('YYYY-MM-DD HH:mm:ss')
        patchTestExam({ id: dataList.id, body: data }).then((res) => {
            if (res.data) {
                message.success('Экзамен отредактирован')
                setOpen(false)
            } else {
                message.error(res.error.data.errors[0])
            }
        })
    }
    const onSearch = (value) => console.log(value)

    return (
        <div>
            <Modal
                destroyOnClose={true}
                title="Редактирование запланированного экзамена"
                visible={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={[
                    <MyButton key="submit" htmlType="submit" form="ese-form">
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
                    initialValues={{
                        ['date_start']: moment(dataList?.date_start),
                        ['date_finish']: moment(dataList?.date_finish),
                        ['experts']: dataList?.experts,
                        ['moderators']: dataList?.moderators,
                        ['direction']: dataList?.direction,
                        ['unit']: dataList?.unit,
                        ['test_group']: dataList?.test_group,
                        ['main_expert']: dataList?.main_expert,
                        ['main_moderator']: dataList?.main_moderator,
                    }}
                    onFinish={onSubmit}
                    id="ese-form"
                >
                    <Form.Item required label="Квалификация" name="direction">
                        <Select placeholder="Выберите квалификацию">
                            {dataTutor?.results.map((item, index) => (
                                <Option key={index} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item required label="Тестирование" name="unit">
                        <Select placeholder="Выберите тестирование">
                            {dataUnit?.results.map((item, index) => (
                                <Option key={index} value={item.id}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item required label="Группа аттестуемых" name="test_group">
                        <Select placeholder="Выберите группу аттестуемых">
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
                                            label={`Эксперт ${key + 1} `}
                                            name={key}
                                            style={{ width: '100%', marginRight: 20 }}
                                            required
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
                                            onClick={() => remove(name)}
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
                                            label={`Модератор ${key + 1} `}
                                            name={key}
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
                                            onClick={() => remove(name)}
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

export default ESEditModal
