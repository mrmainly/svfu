import { useState } from 'react'

import {
    Modal,
    Row,
    Col,
    Form,
    Input,
    Select,
    Button,
    Upload,
    message,
    Radio,
    Checkbox,
} from 'antd'

import { PlusOutlined, UploadOutlined, DeleteTwoTone } from '@ant-design/icons'
import PropTypes from 'prop-types'

import { MyButton } from '../../../../components'

import {
    usePostConstructorQuestionImageMutation,
    usePostConstructorQuestionMutation,
    usePostConstructorQuestionFileMutation,
} from '../../../../services/ManagerService'
import { useGetToolsDirectionQuery } from '../../../../services/ToolsService'
const { Option } = Select
const { TextArea } = Input
const QBAddModal = ({ open, setOpen }) => {
    const { data } = useGetToolsDirectionQuery()
    const [img, setImg] = useState()
    const [componentTech, setComponentTech] = useState()
    const [radioId, setRadioId] = useState('')
    const [fileList, setFileList] = useState([])
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )
    const props = {
        beforeUpload: (file) => {
            const isPNG = file.type === 'image/png' || file.type === 'image/jpeg'

            if (!isPNG) {
                message.error(`${file.name} не является PNG/JPEG файлом`)
                return isPNG || Upload.LIST_IGNORE
            }

            return false
        },
    }
    const props2 = {
        beforeUpload: (file) => {
            setFileList([...fileList, file])
            return false
        },
        fileList,
    }
    const children = [
        { value: 'MULTIPLE_CHOICE', label: 'Вопрос с множественными ответами' },
        { value: 'ONE_CHOICE', label: 'Вопрос с одним ответом' },
        { value: 'DESCRIBE', label: 'Открытый вопрос' },
    ]
    const [postConstructorQuestion] = usePostConstructorQuestionMutation()
    const [postConstructorQuestionImage] = usePostConstructorQuestionImageMutation()
    const [postConstructorQuestionFile] = usePostConstructorQuestionFileMutation()

    const onSubmit = (data) => {
        if (data.technique === 'ONE_CHOICE' || data.technique === 'MULTIPLE_CHOICE') {
            data.variant = data.variant.map(
                (item, index) =>
                    (item = { name: item.name, is_true: radioId === index ? true : false })
            )
        } else {
            data.difficulty = 'DESCRIBE'
        }
        postConstructorQuestion(data).then((res) => {
            if (res.data) {
                message.success('Вопрос создан')
                if (img) {
                    const formData = new FormData()
                    formData.append('image', img)

                    postConstructorQuestionImage({
                        id: res.data.question_id,
                        formData: formData,
                    })
                }
                if (data.technique === 'DESCRIBE') {
                    fileList.forEach((file) => {
                        const formData = new FormData()
                        formData.append('file', file)
                        postConstructorQuestionFile({
                            id: res.data.question_id,
                            formData: formData,
                        })
                    })
                }
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
                title="Создание вопроса"
                visible={open}
                onOk={() => {
                    setOpen(false)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
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
                <Form layout="vertical" onFinish={onSubmit} id="qbadd-form">
                    <Form.Item label="Квалификация вопроса" name="direction">
                        <Select
                            mode="multiple"
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
                            onChange={(value) => setComponentTech(value)}
                        >
                            {children.map((itemm, index) => (
                                <Option value={itemm.value} key={index}>
                                    {itemm.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Изображение">
                        <Upload
                            {...props}
                            listType="picture-card"
                            multiple={false}
                            maxCount={1}
                            onRemove={() => setImg()}
                        >
                            {uploadButton}
                        </Upload>
                    </Form.Item>
                    <Form.Item label="Текст вопроса" name="description">
                        <TextArea />
                    </Form.Item>
                    {componentTech === 'ONE_CHOICE' || componentTech === 'MULTIPLE_CHOICE' ? (
                        <Form.Item label="Сложность вопроса" name="difficulty">
                            <Select>
                                <Option value="BEGINNER">Легкая</Option>
                                <Option value="ADVANCED">Средняя</Option>
                                <Option value="EXPERT">Тяжелая</Option>
                            </Select>
                        </Form.Item>
                    ) : null}
                    {componentTech === 'MULTIPLE_CHOICE' ? (
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
                    ) : null}
                    {componentTech === 'ONE_CHOICE' ? (
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
                                                            onClick={() => remove(field.name)}
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
                    ) : null}
                    {componentTech === 'DESCRIBE' ? (
                        <Upload action="none" {...props2} multiple={true} labelCol={{ span: 24 }}>
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    ) : null}
                </Form>
            </Modal>
        </div>
    )
}

QBAddModal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
}

export default QBAddModal
