import { useState, useRef } from 'react'
import { Typography, Space, Spin, Form, Button, Modal, Select, Upload, Input, message } from 'antd'
import { FileTwoTone, EditOutlined, UploadOutlined } from '@ant-design/icons'

import Item from 'antd/lib/list/Item'

import { MyButton } from '../../../../components'
import {
    usePostDocumentsDiplomaMutation,
    usePostDocumentsMutation,
    usePostDocumentsTitlesMutation,
} from '../../../../services/DocumentsService'
const { TextArea } = Input
const { Option } = Select
const { Text } = Typography

const UDAddModal = ({ open, setOpen }) => {
    const [postDocumentsDiploma] = usePostDocumentsDiplomaMutation()
    const [postDocumentsTitles] = usePostDocumentsTitlesMutation()
    const [postDocuments] = usePostDocumentsMutation()
    let valRef = useRef()
    let editRef = useRef()
    const [value, setValue] = useState()
    const [file, setFile] = useState()
    const [edit, setEdit] = useState([])
    const props = {
        beforeUpload: (file) => {
            setFile(file)
            const isPDF = file.type === 'application/pdf'

            if (!isPDF) {
                message.error(`${file.name} не является pdf файлом`)
                return isPDF || Upload.LIST_IGNORE
            }

            return false
        },
    }
    const onSubmit = (data) => {
        let formData = new FormData()
        switch (value) {
            case 'Паспорт':
                formData.append('passport', file)
                postDocuments({ formData: formData }).then((res) => {
                    if (res.data) {
                        message.success('Документ изменен')
                    } else {
                        message.error(`${res.error.data.errors[1]}`)
                    }
                })
                setFile()
                break
            case 'Диплом':
                formData.append('file', file)
                formData.append('name', valRef.current.input.value)
                postDocumentsDiploma({ formData: formData }).then((res) => {
                    if (res.data) {
                        message.success('Документ изменен')
                    } else {
                        message.error(`${res.error.data.errors[1]}`)
                    }
                })
                setFile()
                break
            case 'Образование':
                formData.append('file', file)
                formData.append('name', valRef.current.input.value)
                postDocumentsTitles({ formData: formData }).then((res) => {
                    if (res.data) {
                        message.success('Документ изменен')
                    } else {
                        message.error(`${res.error.data.errors[1]}`)
                    }
                })
                setFile()
                break
        }

        setOpen(false)
    }
    const onSearch = (value) => console.log(value)

    return (
        <div>
            <Modal
                destroyOnClose={true}
                title="Добавить документы"
                style={{
                    top: 20,
                }}
                visible={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={[
                    <Button key="back" onClick={() => setOpen(false)}>
                        Отмена
                    </Button>,
                    <Button key="submit" type="primary" onClick={onSubmit}>
                        Сохранить
                    </Button>,
                ]}
            >
                <Text style={{ fontWeight: 600, fontSize: 16 }}>Тип документа</Text>
                <div style={{ marginTop: '10px' }}>
                    <Select
                        defaultValue="Выберите тип документа"
                        style={{
                            width: '100%',
                        }}
                        onChange={(value) => setValue(value)}
                    >
                        <Option value="Паспорт">Паспорт</Option>
                        <Option value="Диплом">Диплом</Option>
                        <Option value="Образование">
                            Образование, ученое звание и учёные степени
                        </Option>
                    </Select>
                </div>
                {value === 'Паспорт' ? (
                    <></>
                ) : (
                    <div style={{ marginTop: '10px' }}>
                        <Text style={{ fontWeight: 600, fontSize: 16 }}>Описание</Text>
                        <Input
                            style={{ marginTop: '10px' }}
                            size="large"
                            ref={valRef}
                            type="text"
                        />
                    </div>
                )}

                <div style={{ marginTop: '10px' }}>
                    <Upload
                        action="none"
                        {...props}
                        name="passport"
                        multiple={false}
                        maxCount={1}
                        labelCol={{ span: 24 }}
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                </div>
            </Modal>
        </div>
    )
}

export default UDAddModal
