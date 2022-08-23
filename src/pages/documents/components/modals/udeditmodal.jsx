import { useState, useRef } from 'react'
import { Typography, Space, Spin, Form, Button, Modal, Select, Upload, Input, message } from 'antd'
import { FileTwoTone, EditOutlined, UploadOutlined } from '@ant-design/icons'

import Item from 'antd/lib/list/Item'

import { MyButton } from '../../../../components'
import {
    usePostDocumentsMutation,
    usePatchDocumentsDiplomaMutation,
    usePatchDocumentsTitlesMutation,
} from '../../../../services/DocumentsService'
const { TextArea } = Input
const { Option } = Select
const { Text } = Typography

const UDEditModal = ({ open, setOpen, dataList }) => {
    const [patchDocumentsDiploma] = usePatchDocumentsDiplomaMutation()
    const [patchDocumentsTitles] = usePatchDocumentsTitlesMutation()
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
    const onEdit = () => {
        console.log(edit)
        let formData = new FormData()
        switch (dataList.type) {
            case 'Паспорт':
                if (file) formData.append('passport', file)
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
                if (file) formData.append('file', file)
                formData.append('name', editRef.current.input.value)
                console.log(file)
                patchDocumentsDiploma({ id: dataList.id, formData: formData }).then((res) => {
                    if (res.data) {
                        message.success('Документ изменен')
                    } else {
                        message.error(`${res.error.data.errors[1]}`)
                    }
                })
                setFile()
                break
            case 'Образование, ученое звание и учёные степени':
                if (file) formData.append('file', file)
                formData.append('name', editRef.current.input.value)
                patchDocumentsTitles({ id: dataList.id, formData: formData }).then((res) => {
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
    console.log('dasd', dataList)
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
                    <Button key="back" onClick={() => setOpen(false)}>
                        Отмена
                    </Button>,
                    <Button key="submit" type="primary" onClick={onEdit}>
                        Сохранить
                    </Button>,
                ]}
            >
                <Text style={{ fontWeight: 600, fontSize: 16 }}>Тип документа</Text>
                <div style={{ marginTop: '10px' }}>
                    <Typography style={{ fontWeight: 400, fontSize: 16 }}>
                        {dataList.type}
                    </Typography>
                </div>
                {dataList.type === 'Паспорт' ? (
                    <></>
                ) : (
                    <div style={{ marginTop: '10px' }}>
                        <Text style={{ fontWeight: 600, fontSize: 16 }}>Описание</Text>
                        <Input
                            style={{ marginTop: '10px' }}
                            size="large"
                            ref={editRef}
                            type="text"
                            defaultValue={dataList.name}
                        />
                    </div>
                )}

                <div
                    style={{
                        marginTop: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}
                >
                    <Text style={{ fontWeight: 600, fontSize: 16 }}>Документ</Text>
                    <Upload {...props} multiple={false} maxCount={1} labelCol={{ span: 24 }}>
                        <Button icon={<UploadOutlined />}>Загрузить документ</Button>
                    </Upload>
                </div>
            </Modal>
        </div>
    )
}

export default UDEditModal
