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
} from 'antd'

import { MinusCircleOutlined, PlusOutlined, UploadOutlined, DeleteTwoTone } from '@ant-design/icons'

import { MyButton } from '../../../../components'
import {
    usePostAttestationsQuestionsBankImageMutation,
    usePostAttestationsQuestionsBankFileMutation,
    usePostAttestationsQuestionsBankMutation,
    useGetAttestationsQualificationQuery,
    useGetAttestationsQuestionsBankQuery,
    usePatchAttestationsQuestionsBankMutation,
    usePatchAttestationsQuestionsBankImageMutation,
    useDeleteAttestationsQuestionsBankFileMutation,
    useDeleteAttestationsQuestionsBankImageMutation,
    usePatchAttestationsQuestionsAnswerMutation,
} from '../../../../services/AttestationService'

const { Option } = Select
const { TextArea } = Input
const QBAddModal = ({ open, setOpen, dataList }) => {
    const { data: globalData } = useGetAttestationsQualificationQuery()
    const [img, setImg] = useState()
    const [componentTech, setComponentTech] = useState()
    const [radioId, setRadioId] = useState('')
    const [form] = Form.useForm()
    const [fileList, setFileList] = useState(null)
    const [deletedId, setDeletedId] = useState([])
    const [uploadFiles, setUploadFiles] = useState([])
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
    }, [dataList])
    //   console.log('dataList', dataList)
    //   console.log('img', img)
    //  console.log('files', fileList)
    //  console.log('deleted id', deletedId)
    //  console.log('uploadFiles', uploadFiles)
    //  console.log('radioId', radioId)

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
        { value: 'MULTIPLE_CHOICE', label: 'Checkbox' },
        { value: 'ONE_CHOICE', label: 'Radiobutton' },
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

    const [postAttestationsQuestionsBank] = usePostAttestationsQuestionsBankMutation()
    const [postAttestationsQuestionsBankImage] = usePostAttestationsQuestionsBankImageMutation()
    const [postAttestationsQuestionsBankFile] = usePostAttestationsQuestionsBankFileMutation()
    const [patchAttestationsQuestionsBank] = usePatchAttestationsQuestionsBankMutation()
    const [patchAttestationsQuestionsBankImage] = usePatchAttestationsQuestionsBankImageMutation()
    const [patchAttestationsQuestionsAnswer] = usePatchAttestationsQuestionsAnswerMutation()
    const [deleteFile] = useDeleteAttestationsQuestionsBankFileMutation()
    const [deleteImage] = useDeleteAttestationsQuestionsBankImageMutation()
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
                postAttestationsQuestionsBankFile({
                    id: dataList?.id,
                    formData: formData,
                })
            })
        }

        if (typeof img === 'object' && dataList?.question_images.length) {
            let formData = new FormData()
            formData.append('image', img)

            patchAttestationsQuestionsBankImage({
                id: dataList?.question_images[0].id,
                formData: formData,
            })
        } else if (dataList?.question_images.length === 0) {
            let formData = new FormData()
            formData.append('image', img)

            postAttestationsQuestionsBankImage({
                id: dataList?.id,
                formData: formData,
            })
        } else if (typeof img !== 'string') {
            deleteImage(dataList?.question_images[0].id)
        }

        if (data.technique === 'ONE_CHOICE') {
            console.log(data.variant)
            data.variant.forEach((item, index) => {
                patchAttestationsQuestionsAnswer({
                    id: item.id,
                    body: { name: item.name, is_true: radioId === index ? true : false },
                })
            })
        } else if (data.technique === 'MULTIPLE_CHOICE') {
            data.variant.forEach((item) => {
                patchAttestationsQuestionsAnswer({
                    id: item.id,
                    body: { name: item.name, is_true: item.is_true },
                })
            })
        } else {
            data.difficulty = 'DESCRIBE'
        }

        patchAttestationsQuestionsBank({ id: dataList?.id, body: data }).then((res) => {
            if (res.data) {
                message.success('Вопрос изменен')
                form.resetFields()
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
                title="Создание вопроса"
                visible={open}
                onOk={() => {
                    setOpen(false)
                }}
                onCancel={() => {
                    setOpen(false)
                    form.resetFields()
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
                        ['name']: dataList?.name,
                        ['direction']: dataList?.direction,
                        ['technique']: dataList?.technique,
                        ['description']: dataList?.description,
                        ['difficulty']: dataList?.difficulty,
                        ['variant']: dataList?.variant,
                    }}
                    onFinish={onSubmit}
                    id="qbedit-form"
                >
                    <Form.Item label="Название вопроса" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Квалификация вопроса" name="direction">
                        <Select
                            mode="multiple"
                            style={{
                                width: '100%',
                            }}
                        >
                            {globalData?.results.map((item, index) => (
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
                </Form>
            </Modal>
        </div>
    )
}

export default QBAddModal
