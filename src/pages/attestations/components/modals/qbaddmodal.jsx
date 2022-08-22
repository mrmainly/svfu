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
    Checkbox,
    Switch,
} from 'antd'

import { MinusCircleOutlined, PlusOutlined, UploadOutlined, DeleteTwoTone } from '@ant-design/icons'

import { MyButton } from '../../../../components'
import {
    usePostAttestationsQuestionsBankImageMutation,
    usePostAttestationsQuestionsBankMutation,
    useGetAttestationsQualificationQuery,
    useGetAttestationsQuestionsBankQuery,
} from '../../../../services/AttestationService'

const { Option } = Select
const { TextArea } = Input
const QBAddModal = ({ open, setOpen }) => {
    const { data: imageId } = useGetAttestationsQuestionsBankQuery()
    const { data } = useGetAttestationsQualificationQuery()
    const [file, setFile] = useState()
    const [pdfFile, setPdfFile] = useState()
    const [technique, setTechnique] = useState('')
    const [radioId, setRadioId] = useState('')
    const [form] = Form.useForm()
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
    const props2 = {
        beforeUpload: (file) => {
            const isPDF = file.type === 'application/pdf'
            setPdfFile(file)
            if (!isPDF) {
                message.error(`${file.name} не является pdf файлом`)
                return isPDF || Upload.LIST_IGNORE
            }

            return false
        },
    }
    const children = [
        { value: 'MULTIPLE_CHOICE', label: 'Checkbox' },
        { value: 'ONE_CHOICE', label: 'Radiobutton' },
        { value: 'DESCRIBE', label: 'Открытый вопрос' },
    ]
    const [postAttestationsQuestionsBank] = usePostAttestationsQuestionsBankMutation()
    const [postAttestationsQuestionsBankImage] = usePostAttestationsQuestionsBankImageMutation()
    const onSubmit = (data) => {
        // let formData = new FormData()
        // formData.append('image', file)
        // formData.append('image_name', file.name)
        // console.log('someid', someid[someid.length - 1].id)
        if (data.technique === 'ONE_CHOICE') {
            data.variant = data.variant.map(
                (item, index) =>
                    (item = { name: item.name, is_true: radioId === index ? true : false })
            )
        }
        // if (data.technique === 'DESCRIBE') {
        //     data.variant = data.variant.delete
        // }

        // data.question_images = [
        //     { image_name: data.question_images.file.name, image: data.question_images.file },
        // ]
        postAttestationsQuestionsBank(data).then((res, req) => {
            if (res.data) {
                // let someid = imageId.filter((item) => item.name === data.name)
                // postAttestationsQuestionsBankImage({
                //     id: someid[someid.length - 1].id,
                //     formData: formData,
                // }).then((res) => {
                //     if (res.data) {
                //         message.success('Вопрос создан')
                //         setOpen(false)
                //     } else {
                //         message.error(res.error.data.errors[0])
                //     }
                //     console.log(res)
                // })
                message.success('Вопрос создан')
                setOpen(false)
            } else {
                message.error(res.error.data.errors[0])
            }
            console.log('req.params.id', req.params.id)
        })
    }
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
                <Form form={form} layout="vertical" onFinish={onSubmit} id="qbadd-form">
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
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) =>
                            prevValues.gender !== currentValues.gender
                        }
                    >
                        {({ getFieldValue }) =>
                            (getFieldValue('technique') === 'MULTIPLE_CHOICE' && (
                                <Form.List name="variant">
                                    {(fields, { add, remove }) => (
                                        <>
                                            {fields.map(({ key, name, ...restField }) => (
                                                <Row
                                                    key={key}
                                                    justify="space-between"
                                                    style={{ width: '80%' }}
                                                    align=""
                                                >
                                                    <Col span={18}>
                                                        <Form.Item
                                                            {...restField}
                                                            name={[name, 'name']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message:
                                                                        'Заполните вариант ответа или удалите поле',
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder="Вариант ответа" />
                                                        </Form.Item>
                                                    </Col>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'is_true']}
                                                        valuePropName="checked"
                                                        initialValue={false}
                                                    >
                                                        <Checkbox></Checkbox>
                                                    </Form.Item>
                                                    <Form.Item>
                                                        {fields.length > 2 ? (
                                                            <DeleteTwoTone
                                                                twoToneColor="#EB5757"
                                                                onClick={() => remove(name)}
                                                            />
                                                        ) : null}
                                                    </Form.Item>
                                                </Row>
                                            ))}
                                            <Form.Item>
                                                <Button
                                                    onClick={() => add()}
                                                    block
                                                    type="primary"
                                                    ghost
                                                    icon={<PlusOutlined />}
                                                >
                                                    Добавить вариант ответа
                                                </Button>
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            )) ||
                            (getFieldValue('technique') === 'ONE_CHOICE' && (
                                <Form.List name="variant">
                                    {(fields, { add, remove }, { errors }) => (
                                        <>
                                            {fields.map((field, index) => (
                                                <Row
                                                    key={field.key}
                                                    justify="space-between"
                                                    style={{ width: '80%' }}
                                                >
                                                    <Col span={18}>
                                                        <Form.Item
                                                            {...field}
                                                            name={[field.name, 'name']}
                                                            validateTrigger={['onChange', 'onBlur']}
                                                            rules={[
                                                                {
                                                                    required: true,
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
                                                        <Form.Item>
                                                            <Radio
                                                                checked={index === radioId}
                                                                onChange={() => setRadioId(index)}
                                                            ></Radio>
                                                        </Form.Item>
                                                    </Col>
                                                    <Col>
                                                        {fields.length > 2 ? (
                                                            <Form.Item>
                                                                <DeleteTwoTone
                                                                    twoToneColor="#EB5757"
                                                                    onClick={() =>
                                                                        remove(field.name)
                                                                    }
                                                                />
                                                            </Form.Item>
                                                        ) : null}
                                                    </Col>
                                                </Row>
                                            ))}
                                            <Form.Item>
                                                <Button
                                                    onClick={() => add()}
                                                    block
                                                    type="primary"
                                                    ghost
                                                    icon={<PlusOutlined />}
                                                >
                                                    Добавить вариант ответа
                                                </Button>
                                                <Form.ErrorList errors={errors} />
                                            </Form.Item>
                                        </>
                                    )}
                                </Form.List>
                            )) ||
                            (getFieldValue('technique') === 'DESCRIBE' && (
                                <Upload
                                    action="none"
                                    {...props2}
                                    multiple={false}
                                    maxCount={1}
                                    labelCol={{ span: 24 }}
                                >
                                    <Button icon={<UploadOutlined />}>Upload</Button>
                                </Upload>
                            ))
                        }
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default QBAddModal
