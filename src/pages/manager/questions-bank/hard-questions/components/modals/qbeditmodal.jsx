import { useState, useEffect } from 'react'

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
    Switch,
    Spin,
    Space,
} from 'antd'
import PropTypes from 'prop-types'

import { PlusOutlined, UploadOutlined, DeleteTwoTone } from '@ant-design/icons'

import { MyButton } from '../../../../../../components'
import {
    usePostConstructorQuestionFileMutation,
    usePostConstructorQuestionImageMutation,
    usePatchConstructorQuestionIdImageMutation,
    useDeleteConstructorQuestionIdFileMutation,
    useDeleteConstructorQuestionIdImageMutation,
} from '../../../../../../services/manager/question-bank'
import {
    usePostConstructorAnswerQuestionMutation,
    usePutConstructorQuestionMutation,
    usePatchConstructorQuestionMutation,
    usePatchConstructorAnswerMutation,
    useDeleteConstructorAnswerMutation,
    useGetConstructorQuestionIdQuery,
} from '../../../../../../services/manager/question-bank/HardQuestion'
import { usePatchQuestionSoftFileMutation } from '../../../../../../services/manager/question-bank/SoftQuestion'

import { useGetToolsDirectionQuery } from '../../../../../../services/ToolsService'

const { Option } = Select
const { TextArea } = Input
const QBEditModal = ({ open, setOpen, id }) => {
    const { data: globalData } = useGetToolsDirectionQuery()
    const { data: dataList, isFetching } = useGetConstructorQuestionIdQuery({ id: id })

    const [img, setImg] = useState()
    const [componentTech, setComponentTech] = useState()
    const [radioId, setRadioId] = useState('')
    const [file, setFile] = useState('')
    useEffect(() => {
        setComponentTech(dataList?.technique)
        setRadioId(dataList?.variant?.findIndex((item) => item.is_true))
        setImg(dataList?.question_images.length !== 0 ? dataList?.question_images[0].image : null)
        setFile(dataList?.question_files[0]?.file)
    }, [dataList])

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Загрузить</div>
        </div>
    )

    const props = {
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
            setFile(file)

            return false
        },
    }
    const children = [
        { value: 'MULTIPLE_CHOICE', label: 'Вопрос с множественными ответами' },
        { value: 'ONE_CHOICE', label: 'Вопрос с одним ответом' },
        { value: 'DESCRIBE', label: 'Открытый вопрос' },
    ]

    const [postConstructorQuestionImage] = usePostConstructorQuestionImageMutation()
    const [postConstructorQuestionFile] = usePostConstructorQuestionFileMutation()
    const [postConstructorAnswerQuestion] = usePostConstructorAnswerQuestionMutation()
    const [patchConstructorQuestion] = usePatchConstructorQuestionMutation()
    const [patchConstructorQuestionIdImage] = usePatchConstructorQuestionIdImageMutation()
    const [patchConstructorAnswer] = usePatchConstructorAnswerMutation()
    const [putConstructorQuestion] = usePutConstructorQuestionMutation()
    const [deleteFile] = useDeleteConstructorQuestionIdFileMutation()
    const [deleteImage] = useDeleteConstructorQuestionIdImageMutation()
    const [deleteAnswer] = useDeleteConstructorAnswerMutation()
    const [patchQuestionSoftFile] = usePatchQuestionSoftFileMutation()

    const defualtFileList = [
        {
            uid: '-1',
            name: dataList?.question_files[0]?.file,
            status: 'done',
            url: dataList?.question_files[0]?.file,
        },
    ]
    const defualtImgList = [
        {
            uid: '-1',
            name: dataList?.question_images[0]?.image,
            status: 'done',
            url: dataList?.question_images[0]?.image,
        },
    ]
    const onSubmit = (data) => {
        if (data?.is_active != dataList?.is_active) {
            putConstructorQuestion({ id: id }).then(() => {
                message.success('активность')
            })
        }
        if (data.technique === 'DESCRIBE') {
            if (typeof file === 'object' && dataList?.question_files[0]?.file) {
                const formData = new FormData()
                formData.append('file', file)
                patchQuestionSoftFile({
                    formData: formData,
                    id: dataList?.question_files[0].id,
                })
            } else if (file !== '' && dataList?.question_files?.length === 0) {
                const formData = new FormData()
                formData.append('file', file)
                formData.append('question_id', dataList.id)
                postConstructorQuestionFile({ formData: formData }).then((res) => {
                    if (res.error) {
                        message.error('Файл не корректно загружен')
                    }
                })
            } else if (dataList?.question_files[0]?.file && file === '') {
                deleteFile(dataList?.question_files[0].id)
            }
        }

        if (typeof img === 'object' && dataList?.question_images.length) {
            const formData = new FormData()
            formData.append('image', img)

            patchConstructorQuestionIdImage({
                id: dataList?.question_images[0].id,
                formData: formData,
            })
        } else if (dataList?.question_images.length === 0 && img != null) {
            const formData = new FormData()
            formData.append('image', img)
            formData.append('question_id', dataList?.id)
            postConstructorQuestionImage({
                formData: formData,
            }).then((res) => {
                if (res.error) {
                    message.error('Фотография не корректно загружено')
                }
            })
        } else if (dataList?.question_images.length !== 0 && typeof img !== 'string') {
            deleteImage(dataList?.question_images[0].id)
        }

        if (data.technique === 'ONE_CHOICE') {
            for (let i = 0; i < dataList?.variant?.length; i++) {
                if (
                    data.variant.find((item2) => item2.id === dataList?.variant[i].id) === undefined
                ) {
                    deleteAnswer(dataList?.variant[i].id)
                }
            }
            data.variant.forEach((item, index) => {
                item.id
                    ? patchConstructorAnswer({
                          id: item.id,
                          body: { name: item.name, is_true: radioId === index ? true : false },
                      })
                    : postConstructorAnswerQuestion({
                          id: dataList?.id,
                          body: { name: item.name, is_true: radioId === index ? true : false },
                      })
            })
        } else if (data.technique === 'MULTIPLE_CHOICE') {
            data.variant.forEach((item) => {
                patchConstructorAnswer({
                    id: item.id,
                    body: { name: item.name, is_true: item.is_true },
                })
            })
        } else {
            data.difficulty = 'DESCRIBE'
        }
        patchConstructorQuestion({ id: dataList?.id, body: data }).then((res) => {
            if (res.data) {
                message.success('Вопрос изменен')
                setOpen(false)
            } else {
                message.error(res.error.data.errors[0])
            }
        })
    }

    if (isFetching) {
        return <div></div>
    }
    console.log(dataList)
    return (
        <div>
            <Modal
                style={{ top: 0 }}
                destroyOnClose={true}
                title="Изменение вопроса"
                visible={open}
                onOk={() => {
                    setOpen(false)
                }}
                onCancel={() => {
                    setOpen(false)
                }}
                footer={[
                    <MyButton key="submit" htmlType="submit" form="qbedit-form">
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
                {isFetching && (
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
                <Form
                    layout="vertical"
                    initialValues={{
                        ['direction']: dataList?.direction,
                        ['technique']: dataList?.technique,
                        ['description']: dataList?.description,
                        ['difficulty']: dataList?.difficulty,
                        ['variant']: dataList?.variant,
                        ['is_active']: dataList?.is_active,
                    }}
                    onFinish={onSubmit}
                    id="qbedit-form"
                    style={{ opacity: isFetching ? 0.5 : 1 }}
                >
                    <Form.Item label="Квалификация вопроса" name="direction">
                        <Select
                            mode="multiple"
                            style={{
                                width: '100%',
                            }}
                        >
                            {globalData?.map((item) => (
                                <Option value={item.id} key={item.id}>
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
                            defaultFileList={img === null ? null : defualtImgList}
                            accept=".jpg,.jpeg,.png"
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
                                <Option value="EXPERT">Сложная</Option>
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
                        <Upload
                            //  action="none"
                            {...props2}
                            labelCol={{ span: 24 }}
                            defaultFileList={dataList?.question_files[0]?.file && defualtFileList}
                            multiple={false}
                            maxCount={1}
                            style={{marginBottom: 10}}
                        >
                            <Button icon={<UploadOutlined />}>
                                Загрузить файл
                            </Button>
                        </Upload>
                    ) : null}
                    <Space align="baseline" style={{marginTop: 20}}>
                        <Form.Item name="is_active" valuePropName="checked" noStyle>
                            <Switch checkedChildren="Yes" unCheckedChildren="No" />
                        </Form.Item>
                        <span>Активность квалификации</span>
                    </Space>
                </Form>
            </Modal>
        </div>
    )
}

QBEditModal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    id: PropTypes.number,
}

export default QBEditModal
