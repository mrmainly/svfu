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
    Space,
    Switch,
    Typography,
} from 'antd'
import PropTypes from 'prop-types'

import { PlusOutlined, UploadOutlined, DeleteTwoTone } from '@ant-design/icons'

import { MyButton } from '../../../../components'
import {
    usePostConstructorQuestionFileMutation,
    usePostConstructorQuestionImageMutation,
    usePostConstructorAnswerQuestionMutation,
    usePutConstructorQuestionMutation,
    usePatchConstructorQuestionMutation,
    usePatchConstructorQuestionIdImageMutation,
    usePatchConstructorAnswerMutation,
    useDeleteConstructorQuestionIdFileMutation,
    useDeleteConstructorQuestionIdImageMutation,
    useDeleteConstructorAnswerMutation,
} from '../../../../services/ManagerService'
import { useGetToolsDirectionQuery } from '../../../../services/ToolsService'

const { Option } = Select
const { TextArea } = Input
const QBEditModal = ({ open, setOpen, dataList }) => {
    const { data: globalData } = useGetToolsDirectionQuery()
    const [img, setImg] = useState()
    const [componentTech, setComponentTech] = useState()
    const [radioId, setRadioId] = useState('')
    const [fileList, setFileList] = useState(null)
    const [deletedId, setDeletedId] = useState([])
    const [uploadFiles, setUploadFiles] = useState([])
    const [active, setActive] = useState()
    useEffect(() => {
        setFileList(null)
        setDeletedId([])
        setUploadFiles([])
        setComponentTech(dataList?.technique)
        setRadioId(dataList?.variant?.findIndex((item) => item.is_true))
        setImg(dataList?.question_images.length !== 0 ? dataList?.question_images[0].image : null)
        setFileList(
            dataList?.question_files?.map(
                (item) =>
                    (item = {
                        name: decodeURI(item.file).split('/')[5],
                        uid: item.id,
                        status: 'done',
                        url: item.file,
                    })
            )
        )
        setActive(dataList?.is_active)
    }, [dataList])

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
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
            setUploadFiles([...uploadFiles, file])
            setFileList([...fileList, file])
            return false
        },
        onRemove: (file) => {
            setDeletedId([...deletedId, file.uid])
            setFileList(fileList.filter((item) => item.uid !== file.uid))
            setUploadFiles(uploadFiles.filter((item) => item.uid !== file.uid))
        },
    }
    const children = [
        { value: 'MULTIPLE_CHOICE', label: 'Вопрос с множественными ответами' },
        { value: 'ONE_CHOICE', label: 'Вопрос с одним ответом' },
        { value: 'DESCRIBE', label: 'Открытый вопрос' },
    ]

    const defualtFileList = [
        {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: `${img}`,
        },
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
    const onSubmit = (data) => {
        if (data.technique === 'DESCRIBE') {
            deletedId.forEach((element) => {
                dataList?.question_files?.forEach((file) => {
                    if (file.id === element) {
                        deleteFile(element)
                    }
                })
            })
            uploadFiles.forEach((item) => {
                const formData = new FormData()
                formData.append('file', item)
                postConstructorQuestionFile({
                    id: dataList?.id,
                    formData: formData,
                })
            })
        }

        if (typeof img === 'object' && dataList?.question_images.length) {
            const formData = new FormData()
            formData.append('image', img)

            patchConstructorQuestionIdImage({
                id: dataList?.question_images[0].id,
                formData: formData,
            })
        } else if (dataList?.question_images.length === 0 && typeof img === 'object') {
            const formData = new FormData()
            formData.append('image', img)

            postConstructorQuestionImage({
                id: dataList?.id,
                formData: formData,
            })
        } else if (typeof img !== 'string') {
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

        if (dataList?.is_active !== active) {
            putConstructorQuestion({ id: dataList?.id })
        }

        patchConstructorQuestion({ id: dataList?.id, body: data }).then((res) => {
            if (res.data) {
                message.success('Вопрос изменен')
            } else {
                message.error(res.error.data.errors[0])
            }
        })

        setOpen(false)
    }

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
                <Form
                    layout="vertical"
                    initialValues={{
                        ['direction']: dataList?.direction,
                        ['technique']: dataList?.technique,
                        ['description']: dataList?.description,
                        ['difficulty']: dataList?.difficulty,
                        ['variant']: dataList?.variant,
                    }}
                    onFinish={onSubmit}
                    id="qbedit-form"
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
                            defaultFileList={img === null ? null : defualtFileList}
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
                        <Upload
                            //  action="none"
                            {...props2}
                            multiple={true}
                            labelCol={{ span: 24 }}
                            fileList={fileList === null ? null : fileList}
                            //  onChange={handleChange}
                        >
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    ) : null}
                    <Space align="baseline">
                        <Form.Item>
                            <Switch
                                defaultChecked={active}
                                onChange={(e) => {
                                    setActive(e)
                                }}
                            />
                        </Form.Item>
                        <Typography>Активность квалификации</Typography>
                    </Space>
                </Form>
            </Modal>
        </div>
    )
}

QBEditModal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    dataList: PropTypes.object,
}

export default QBEditModal
