import {
    Modal,
    message,
    Input,
    Select,
    Form,
    Row,
    Col,
    InputNumber,
    DatePicker,
    Space,
    Button,
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
    usePostTestExamMutation,
} from '../../../../services/TutorService'
const { TextArea } = Input
const { Option } = Select

const ESAddModal = ({ open, setOpen, dataList }) => {
    const { data: dataTutor } = useGetDirectionTuterQuery()
    const { data: dataTestGroup } = useGetTestGroupQuery()
    const { data: dataUnit } = useGetUnitQuery()
    const { data: dataExpert } = useGetUsersRoleQuery({ role: 'EXPERT' })
    const { data: dataModerator } = useGetUsersRoleQuery({ role: 'MODERATOR' })
    const [postTestExam] = usePostTestExamMutation()
    const onSubmit = (data) => {
        postTestExam(data).then((res) => {
            if (res.data) {
                message.success('Квалификация создана')
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
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Пожайлуста выберите квалификацию!',
                            },
                        ]}
                        label="Квалификация"
                        name="direction"
                    >
                        <Select placeholder="Выберите тег">
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
                                message: 'Пожайлуста выберите тестирование!',
                            },
                        ]}
                        label="Тестирование"
                        name="unit"
                    >
                        <Select placeholder="Выберите тег">
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
                                message: 'Пожайлуста выберите группу аттестуемых!',
                            },
                        ]}
                        label="Группа аттестуемых"
                        name="test_group"
                    >
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
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                        message: 'Пожайлуста выберите дату начала тестирования!',
                                    },
                                ]}
                                label="Дата начала тестирования"
                                name="date_start"
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
                        <Col span={12}>
                            <Form.Item
                                rules={[
                                    {
                                        required: true,
                                        message: 'Пожайлуста выберите дату окончания тестирования!',
                                    },
                                ]}
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
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Пожайлуста выберите эксперта!',
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Выберите тег">
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
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Пожайлуста выберите председателя экспертов!',
                            },
                        ]}
                        label="Председатель экспертов"
                        name="main_expert"
                    >
                        <Select placeholder="Выберите тег">
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
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Пожайлуста выберите модератора!',
                                                },
                                            ]}
                                        >
                                            <Select placeholder="Выберите тег">
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

                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Пожайлуста выберите председателя модераторов!',
                            },
                        ]}
                        label="Председатель модераторов"
                        name="main_moderator"
                    >
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
