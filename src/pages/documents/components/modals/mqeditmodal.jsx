import { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import moment from 'moment'

import { Modal, Form, Typography, Spin, Input, message, DatePicker, Upload, Button } from 'antd'
import { FileTwoTone, EditOutlined, UploadOutlined } from '@ant-design/icons'
import Item from 'antd/lib/list/Item'

import { MyButton } from '../../../../components'
import { usePatchQualificationIdMutation } from '../../../../services/QualificationsService'

const { Text } = Typography
const { RangePicker } = DatePicker

const MQEditModal = ({ open, setOpen, dataList }) => {
    const params = useParams()

    const [file, setFile] = useState('')
    const [date_start, setDate_start] = useState(new Date())
    const [date_finish, setDate_finish] = useState(new Date())

    const [patchQualificationId] = usePatchQualificationIdMutation()
    useEffect(() => {
        setDate_start(new Date(dataList?.date_start))
        setDate_finish(new Date(dataList?.date_finish))
    }, [dataList])

    const onSubmit = (data) => {
        console.log('submurt', data)
        let formData = new FormData()
        formData.append('name', data.name)
        formData.append('doc_id', data.doc_id)
        formData.append('date_start', date_start.toISOString())
        formData.append('date_finish', date_finish.toISOString())
        formData.append('file', file, file.name)
        patchQualificationId({ id: data.doc_id, formData: formData }).then((res) => {
            if (res.data) {
                message.success('Документ изменен')
                setOpen(false)
            } else {
                message.error(`error`)
            }
        })
    }

    function onChange(dates) {
        setDate_start(dates[0])
        setDate_finish(dates[1])
    }

    const handleFile = (e) => {
        setFile(e.file)
    }

    const props = {
        beforeUpload: (file) => {
            const isPDF = file.type === 'application/pdf'

            if (!isPDF) {
                message.error(`${file.name} не является pdf файлом`)
                return isPDF || Upload.LIST_IGNORE
            }

            return false
        },
    }
    return (
        <div>
            <Modal
                destroyOnClose={true}
                title="Изменить документ"
                style={{
                    top: 20,
                }}
                visible={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={[
                    <MyButton key="submit" htmlType="submit" form="mqedit-form">
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
                    initialValues={{
                        ['doc_id']: dataList?.id,
                        ['name']: dataList?.name,
                        ['date_start']: moment(date_start),
                        ['date_finish']: moment(date_finish),
                        ['created']: dataList?.date_of_issue,
                    }}
                    onFinish={onSubmit}
                    id="mqedit-form"
                >
                    <Form.Item
                        label={
                            <Text style={{ fontWeight: 600, fontSize: 16 }}>Номер документа</Text>
                        }
                        name="doc_id"
                        style={{ width: 350 }}
                    >
                        <Text style={{ fontWeight: 400, fontSize: 16 }}>{dataList?.id}</Text>
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text style={{ fontWeight: 600, fontSize: 16 }}>
                                Название квалификации
                            </Text>
                        }
                        name="name"
                        style={{ width: 350 }}
                        labelCol={{ span: 24 }}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text style={{ fontWeight: 600, fontSize: 16 }}>
                                Дата выдачи документа:
                            </Text>
                        }
                        name="created"
                        style={{ width: 350 }}
                    >
                        <Text style={{ fontWeight: 400, fontSize: 16 }}>
                            {dataList?.created.substring(0, 10)}
                        </Text>
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text style={{ fontWeight: 600, fontSize: 16 }}>Срок действия:</Text>
                        }
                        style={{ width: 350 }}
                        labelCol={{ span: 24 }}
                    >
                        <RangePicker
                            defaultValue={[moment(date_start), moment(date_finish)]}
                            onChange={onChange}
                            size="large"
                        ></RangePicker>
                    </Form.Item>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 20,
                        }}
                    >
                        <Upload
                            {...props}
                            listType=""
                            multiple={false}
                            maxCount={1}
                            onChange={handleFile}
                        >
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </div>
                </Form>
            </Modal>
        </div>
    )
}

export default MQEditModal
