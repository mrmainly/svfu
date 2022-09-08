import { useState, useRef } from 'react'
import { Typography, Button, Modal, Upload, Input, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

import {
    usePatchDocumentsMutation,
    useDeleteDocumentMutation,
} from '../../../../services/DocumentsService'
import { documentsChoises } from '../../../../constants'

const { Text } = Typography

const UDEditModal = ({ open, setOpen, dataList }) => {
    const [patchDocuments] = usePatchDocumentsMutation()
    const [deleteDocument] = useDeleteDocumentMutation()

    const editRef = useRef()
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
        const formData = new FormData()
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
                                    setOpen(false)
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
                        {documentsChoises[dataList.document_type]}
                    </Typography>
                </div>
                {dataList.document_type === 'PASSPORT' ? (
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
                    <Upload
                        {...props}
                        multiple={false}
                        maxCount={1}
                        labelCol={{ span: 24 }}
                        accept=".pdf"
                    >
                        <Button icon={<UploadOutlined />}>Загрузить документ</Button>
                    </Upload>
                </div>
            </Modal>
        </div>
    )
}

UDEditModal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    dataList: PropTypes.object,
}

export default UDEditModal
