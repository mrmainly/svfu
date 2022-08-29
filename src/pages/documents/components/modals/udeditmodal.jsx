import { useState, useRef } from 'react'
import { Typography, Button, Modal, Select, Upload, Input, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import {
    usePatchDocumentsMutation,
    useDeleteDocumentMutation,
} from '../../../../services/DocumentsService'
import { udDocumentType } from '../../../../translation/DocumentTypeTranslation'

const { Text } = Typography

const UDEditModal = ({ open, setOpen, dataList }) => {
    const [patchDocuments] = usePatchDocumentsMutation()
    const [deleteDocument] = useDeleteDocumentMutation()

    let editRef = useRef()
    const [file, setFile] = useState()
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
        let formData = new FormData()
        if (file) {
            formData.append('file', file)
        }
        switch (dataList.document_type) {
            case 'PASSPORT':
                formData.append('name', 'Паспорт')
                formData.append('document_type', 'PASSPORT')
                patchDocuments({ id: dataList.id, formData: formData }).then((res) => {
                    if (res.data) {
                        message.success('Паспорт изменен')
                    } else {
                        message.error(`${res.error.data.errors[1]}`)
                    }
                })
                setFile()
                break
            case 'DIPLOMA':
                formData.append('name', editRef.current.input.value)
                formData.append('document_type', 'DIPLOMA')
                patchDocuments({ id: dataList.id, formData: formData }).then((res) => {
                    if (res.data) {
                        message.success('Диплом изменен')
                    } else {
                        message.error(`${res.error.data.errors[1]}`)
                    }
                })
                setFile()
                break
            case 'TITLESDEGREES':
                formData.append('name', editRef.current.input.value)
                formData.append('document_type', 'TITLESDEGREES')
                patchDocuments({ id: dataList.id, formData: formData }).then((res) => {
                    if (res.data) {
                        message.success('Документ об образовании изменен')
                    } else {
                        message.error(`${res.error.data.errors[1]}`)
                    }
                })
                setFile()
                break
        }

        setOpen(false)
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
                    <Button
                        key="delete"
                        onClick={() =>
                            deleteDocument({ id: dataList.id }).then((res) => {
                                if (res.data) {
                                    message.success('Документ удален')
                                } else {
                                    message.error('Документ не удален')
                                }
                            })
                        }
                        type="danger"
                    >
                        Удалить
                    </Button>,
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
                        {udDocumentType(dataList.document_type)}
                    </Typography>
                </div>
                {dataList.document_type === 'Паспорт' ? (
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
