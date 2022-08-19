import { useState } from 'react'

import {
    Modal,
    Row,
    Col,
    Form,
    Input,
    Select,
    TimePicker,
    InputNumber,
    Typography,
    Button,
    Upload,
    message,
    Radio,
    Space,
} from 'antd'

import { MinusCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'

import { MyButton } from '../../../../components'
import {
    usePostAttestationsTestsBankMutation,
    useGetAttestationsQualificationQuery,
} from '../../../../services/AttestationService'
import FormItem from 'antd/lib/form/FormItem'

const { Option } = Select
const { TextArea } = Input
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 4,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 20,
        },
    },
}
const formItemLayoutWithOutLabel = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 20,
            offset: 4,
        },
    },
}
const QBAddModal = ({ open, setOpen }) => {
    const { data } = useGetAttestationsQualificationQuery()
    const [file, setFile] = useState()
    const [technique, setTechnique] = useState('')
    const [checkedId, setCheckedId] = useState(1)

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )
    const handleFile = (e) => {
        setFile(e.file)
    }

    const props = {
        beforeUpload: (file) => {
            const isPNG = file.type === 'image/png' || 'image/jpeg'

            if (!isPNG) {
                message.error(`${file.name} не является PNG/JPEG файлом`)
                return isPNG || Upload.LIST_IGNORE
            }

            return false
        },
    }
    const children = [
        { value: 'MULTIPLE_CHOICE', label: 'Radiobutton' },
        { value: 'ONE_CHOICE', label: 'Checkbox' },
        { value: 'DESCRIBE', label: 'Открытый вопрос' },
    ]
    const [postAttestationsTestsBankMutation] = usePostAttestationsTestsBankMutation()
    const onSubmit = (data) => {
        console.log(data)
        data.variant = data.variant.map(
            (item, index) => (item = { name: item, is_active: checkedId === index ? true : false })
        )
        data.question_images = [{ image: data.question_images }]
        console.log('changedData', data)

        postAttestationsTestsBankMutation(data).then((res) => {
            if (res.data) {
                message.success('Вопрос создан')
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
                destroyOnClose={true}
                title="Создание вопрос"
                visible={open}
                onCancel={() => setOpen(false)}
                style={{ top: 0 }}
                footer={[
                    <MyButton key="submit" htmlType="submit" form="qbadd-form">
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
                    id="qbadd-form"
                    initialValues={{
                        ['names']: [{ id: '', inname: '', is_active: '' }],
                    }}
                >
                    <Form.Item label="Название вопроса" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Квалификация вопроса" name="direction">
                        <Select
                            mode="tags"
                            style={{
                                width: '100%',
                            }}
                        >
                            {data?.map((item, index) => (
                                <Option value={item.id} key={index}>
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Тип вопроса" name="technique">
                        <Select
                            style={{
                                width: '100%',
                            }}
                            onChange={(value) => setTechnique(value)}
                        >
                            {children.map((itemm, index) => (
                                <Option value={itemm.value} key={index}>
                                    {itemm.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Изображение" name="question_images">
                        <Upload
                            {...props}
                            listType="picture-card"
                            multiple={false}
                            maxCount={1}
                            onChange={handleFile}
                        >
                            {uploadButton}
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Текст вопроса" name="description">
                        <TextArea />
                    </Form.Item>
                    <Form.Item label="Сложность вопроса" name="difficulty">
                        <Select>
                            <Option value="BEGINNER">Легкая</Option>
                            <Option value="ADVANCED">Средняя</Option>
                            <Option value="EXPERT ">Тяжелая</Option>
                        </Select>
                    </Form.Item>
                    <Form.List name="variant">
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        label={index === 0 ? 'Ответы' : ''}
                                        required={false}
                                        key={field.key}
                                    >
                                        <Row justify="space-between" style={{ width: '80%' }}>
                                            <Col span={18}>
                                                <Form.Item
                                                    {...field}
                                                    validateTrigger={['onChange', 'onBlur']}
                                                    rules={[
                                                        {
                                                            required: true,
                                                            whitespace: true,
                                                            message:
                                                                'Заполните вариант ответа или удалите поле',
                                                        },
                                                    ]}
                                                    noStyle
                                                >
                                                    <Input placeholder="Вариант ответа" />
                                                </Form.Item>
                                            </Col>
                                            <Col>
                                                <Radio
                                                    checked={index === checkedId}
                                                    onChange={() => setCheckedId(index)}
                                                ></Radio>
                                            </Col>
                                            <Col>
                                                {fields.length > 2 ? (
                                                    <MinusCircleOutlined
                                                        className="dynamic-delete-button"
                                                        onClick={() => remove(field.name)}
                                                        style={{ marginLeft: '5px' }}
                                                    />
                                                ) : null}
                                            </Col>
                                        </Row>
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{
                                            width: '60%',
                                        }}
                                        icon={<PlusOutlined />}
                                    >
                                        Add field
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form>
            </Modal>
        </div>
    )
}

export default QBAddModal
