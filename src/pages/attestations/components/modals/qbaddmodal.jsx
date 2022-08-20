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
    usePostAttestationsQuestionsBankMutation,
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
    let checkData = []
    const { data } = useGetAttestationsQualificationQuery()
    const [file, setFile] = useState()
    const [technique, setTechnique] = useState('')
    const [radioId, setRadioId] = useState('111')

    const [checkId, setCheckId] = useState()
    const onChange = (e) => {
        let checkboxID = checkData.findIndex((item) => item.value === e.value)
        {
            checkboxID === -1
                ? checkData.push({ value: e.value, checked: e.checked })
                : checkData.splice(checkboxID, 1, { value: e.value, checked: e.checked })
        }
        console.log('checkboxID', checkboxID)

        console.log('data', checkData)
    }
    const [form] = Form.useForm()
    const nameValue = Form.useWatch('variant_m', form)
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
        { value: 'MULTIPLE_CHOICE', label: 'Checkbox' },
        { value: 'ONE_CHOICE', label: 'Radiobutton' },
        { value: 'DESCRIBE', label: 'Открытый вопрос' },
    ]
    const [postAttestationsQuestionsBank] = usePostAttestationsQuestionsBankMutation()
    const onSubmit = (data) => {
        console.log('data', data)
        // data.variant = data.variant.map(
        //     (item, index) => (item = { name: item, is_true: radioId === index ? true : false })
        // )
        // data.question_images = [
        //     { image_name: data.question_images.file.name, image: data.question_images.file },
        // ]
        console.log('changedData', data)

        // postAttestationsQuestionsBank(data).then((res) => {
        //     if (res.data) {
        //         message.success('Вопрос создан')
        //         setOpen(false)
        //     } else {
        //         message.error(res.error.data.errors[0])
        //     }
        //     console.log(res)
        // })
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
                    form={form}
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
                                                                    message: 'Missing first name',
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder="First Name" />
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
                                                        <DeleteTwoTone
                                                            twoToneColor="#EB5757"
                                                            onClick={() => remove(name)}
                                                        />
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
                                                                    message: 'Missing first name',
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder="First Name" />
                                                        </Form.Item>
                                                    </Col>
                                                    <Form.Item
                                                        {...restField}
                                                        name={[name, 'is_true']}
                                                        initialValue={false}
                                                    >
                                                        <Radio
                                                        // defaultChecked={false}
                                                        // checked={this.formRef.current.setFieldsValue(
                                                        //     {
                                                        //         variant: {
                                                        //             name: {
                                                        //                 is_true: 'John',
                                                        //             },
                                                        //         },
                                                        //     }
                                                        // )}
                                                        ></Radio>
                                                    </Form.Item>
                                                    <Form.Item>
                                                        <DeleteTwoTone
                                                            twoToneColor="#EB5757"
                                                            onClick={() => remove(name)}
                                                        />
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
                            ))
                        }
                    </Form.Item>

                    {/* <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) =>
                            prevValues.gender !== currentValues.gender
                        }
                    >
                        {
                            ({ getFieldValue }) =>
                                getFieldValue('technique') === 'MULTIPLE_CHOICE' && (
                                    <Form.List name="variant_m">
                                        {(fields, { add, remove }, { errors }) => (
                                            <>
                                                {fields.map(({ field, index, ...restField }) => (
                                                    <Form.Item
                                                        label={index === 0 ? 'Ответы' : ''}
                                                        required={false}
                                                        key={field.key}
                                                    >
                                                        <Row
                                                            justify="space-between"
                                                            style={{ width: '80%' }}
                                                        >
                                                            <Col span={18}>
                                                                <Form.Item
                                                                    {...restField}
                                                                    name={[variant_m, 'namsse']}
                                                                    {...field}
                                                                    validateTrigger={[
                                                                        'onChange',
                                                                        'onBlur',
                                                                    ]}
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
                                                                <Form.Item valuePropName="checked">
                                                                    <Checkbox
                                                                    // value={index}
                                                                    // onChange={(e) =>
                                                                    //     onChange(e.target)
                                                                    // }
                                                                    ></Checkbox>
                                                                </Form.Item>
                                                            </Col>
                                                            <Col>
                                                                {fields.length > 2 ? (
                                                                    <MinusCircleOutlined
                                                                        className="dynamic-delete-button"
                                                                        onClick={() => {
                                                                            remove(field.name)
                                                                            console.log(index)
                                                                            checkData.splice(
                                                                                index,
                                                                                1
                                                                            )
                                                                        }}
                                                                        style={{
                                                                            marginLeft: '5px',
                                                                        }}
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
                                )
                            // ||
                            // (getFieldValue('technique') === 'ONE_CHOICE' && (
                            //     <Form.List name="variant">
                            //         {(fields, { add, remove }, { errors }) => (
                            //             <>
                            //                 {fields.map((field, index) => (
                            //                     <Form.Item
                            //                         label={index === 0 ? 'Ответы' : ''}
                            //                         required={false}
                            //                         key={field.key}
                            //                     >
                            //                         <Row
                            //                             justify="space-between"
                            //                             style={{ width: '80%' }}
                            //                         >
                            //                             <Col span={18}>
                            //                                 <Form.Item
                            //                                     {...field}
                            //                                     validateTrigger={[
                            //                                         'onChange',
                            //                                         'onBlur',
                            //                                     ]}
                            //                                     rules={[
                            //                                         {
                            //                                             required: true,
                            //                                             whitespace: true,
                            //                                             message:
                            //                                                 'Заполните вариант ответа или удалите поле',
                            //                                         },
                            //                                     ]}
                            //                                     noStyle
                            //                                 >
                            //                                     <Input placeholder="Вариант ответа" />
                            //                                 </Form.Item>
                            //                             </Col>
                            //                             <Col>
                            //                                 <Radio
                            //                                     checked={index === radioId}
                            //                                     onChange={() => setRadioId(index)}
                            //                                 ></Radio>
                            //                             </Col>
                            //                             <Col>
                            //                                 {fields.length > 2 ? (
                            //                                     <MinusCircleOutlined
                            //                                         className="dynamic-delete-button"
                            //                                         onClick={() =>
                            //                                             remove(field.name)
                            //                                         }
                            //                                         style={{ marginLeft: '5px' }}
                            //                                     />
                            //                                 ) : null}
                            //                             </Col>
                            //                         </Row>
                            //                     </Form.Item>
                            //                 ))}
                            //                 <Form.Item>
                            //                     <Button
                            //                         type="dashed"
                            //                         onClick={() => add()}
                            //                         style={{
                            //                             width: '60%',
                            //                         }}
                            //                         icon={<PlusOutlined />}
                            //                     >
                            //                         Add field
                            //                     </Button>
                            //                     <Form.ErrorList errors={errors} />
                            //                 </Form.Item>
                            //             </>
                            //         )}
                            //     </Form.List>
                            // ))
                        }
                    </Form.Item> */}
                </Form>
            </Modal>
        </div>
    )
}

export default QBAddModal
