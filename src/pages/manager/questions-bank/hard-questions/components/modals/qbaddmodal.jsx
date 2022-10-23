/* eslint-disable no-undef */
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

import { MyButton } from '../../../../../../components'

import { usePostConstructorQuestionMutation } from '../../../../../../services/manager/question-bank/HardQuestion'
import {
    usePostConstructorQuestionImageMutation,
    usePostConstructorQuestionFileMutation,
} from '../../../../../../services/manager/question-bank'
import { useGetToolsDirectionQuery } from '../../../../../../services/ToolsService'
const { Option } = Select
const { TextArea } = Input
const QBAddModal = ({ open, setOpen }) => {
    const { data } = useGetToolsDirectionQuery()
    const [img, setImg] = useState('')
    const [variantTrueFalse, setVariantTrueFalse] = useState()
    const [componentTech, setComponentTech] = useState()
    const [radioId, setRadioId] = useState('')
    const [file, setFile] = useState('')

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    )
    const propsImg = {
        beforeUpload: (file) => {
            setImg(file)
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
            const isPDF = file.type === 'application/pdf'

            if (!isPDF) {
                message.error(`${file.name} не является pdf файлом`)
                return isPDF || Upload.LIST_IGNORE
            } else {
                setFile(file)
            }

            return false
        },
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
        if (data.technique === 'ONE_CHOICE') {
            data.variant = data.variant.map(
                (item, index) =>
                    (item = { name: item.name, is_true: radioId === index ? true : false })
            )
        }
        if (data.technique === 'DESCRIBE') {
            data.difficulty = 'DESCRIBE'
        }
        if (data.technique === 'ONE_CHOICE' || data.technique === 'MULTIPLE_CHOICE') {
            setVariantTrueFalse(data.variant.find((item) => item.is_true === true))
        }
        if (
            (data.technique === 'ONE_CHOICE' || data.technique === 'MULTIPLE_CHOICE') &&
            variantTrueFalse === undefined
        ) {
            message.error('Минимум 1 правильный вариант ответа')
        } else {
            postConstructorQuestion(data).then((res) => {
                if (res.data) {
                    message.success('Вопрос создан')
                    if (img != '') {
                        const formData = new FormData()
                        formData.append('image', img)
                        formData.append('question_id', res.data.question_id)
                        postConstructorQuestionImage({
                            formData: formData,
                        }).then((res) => {
                            console.log(res)
                            if (res.error) {
                                message.error('Фотография не корректно загружено')
                            }
                        })
                    }
                    if (data.technique === 'DESCRIBE') {
                        const formData = new FormData()
                        formData.append('file', file)
                        formData.append('question_id', res.data.question_id)
                        postConstructorQuestionFile({ formData: formData }).then(() => {
                            if (rest.error) {
                                message.error('Файл не корректно загружен')
                            }
                        })
                    }
                    setOpen(false)
                } else {
                    message.error(res.error.data.errors[0])
                }
            })
        }
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
                    <Form.Item
                        label="Квалификация вопроса"
                        name="direction"
                        rules={[
                            {
                                required: true,
                                message: 'Выберите квалификацию',
                            },
                        ]}
                    >
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
                    <Form.Item
                        label="Тип вопроса"
                        name="technique"
                        rules={[
                            {
                                required: true,
                                message: 'Выберите тип вопроса',
                            },
                        ]}
                    >
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
                            {...propsImg}
                            listType="picture-card"
                            multiple={false}
                            maxCount={1}
                            onRemove={() => setImg()}
                        >
                            {uploadButton}
                        </Upload>
                    </Form.Item>
                    <Form.Item
                        label="Текст вопроса"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Напишите текст вопроса',
                            },
                        ]}
                    >
                        <TextArea />
                    </Form.Item>
                    {componentTech === 'ONE_CHOICE' || componentTech === 'MULTIPLE_CHOICE' ? (
                        <Form.Item
                            label="Сложность вопроса"
                            name="difficulty"
                            rules={[
                                {
                                    required: true,
                                    message: 'Выберите сложность вопроса',
                                },
                            ]}
                        >
                            <Select>
                                <Option value="BEGINNER">Легкая</Option>
                                <Option value="ADVANCED">Средняя</Option>
                                <Option value="EXPERT">Тяжелая</Option>
                            </Select>
                        </Form.Item>
                    ) : null}
                    {componentTech === 'MULTIPLE_CHOICE' ? (
                        <Form.List
                            name="variant"
                            rules={[
                                {
                                    validator: async (_, names) => {
                                        if (!names || names.length < 2) {
                                            return Promise.reject(
                                                new Error('Не менее 2 вариантов ответа')
                                            )
                                        }
                                    },
                                },
                            ]}
                        >
                            {(fields, { add, remove }, { errors }) => (
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
                                        <Form.ErrorList errors={errors} />
                                    </Form.Item>
                                </>
                            )}
                        </Form.List>
                    ) : null}
                    {componentTech === 'ONE_CHOICE' ? (
                        <Form.List
                            name="variant"
                            rules={[
                                {
                                    validator: async (_, names) => {
                                        if (!names || names.length < 2) {
                                            return Promise.reject(
                                                new Error('Не менее 2 вариантов ответа')
                                            )
                                        }
                                    },
                                },
                            ]}
                        >
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
