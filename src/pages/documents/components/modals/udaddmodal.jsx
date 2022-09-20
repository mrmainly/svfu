import { useState, useRef } from 'react'
import { Typography, Button, Modal, Select, Upload, Input, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

import { usePostDocumentsMutation } from '../../../../services/documents/Documents'

const { Option } = Select
const { Text } = Typography

const UDAddModal = ({ open, setOpen }) => {
    const [postDocuments] = usePostDocumentsMutation()
    const valRef = useRef()
    const [value, setValue] = useState()
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
    const onSubmit = () => {
        const formData = new FormData()
        switch (value) {
            case 'Паспорт':
                formData.append('file', file)
                formData.append('document_type', 'PASSPORT')
                formData.append('name', 'Паспорт')
                postDocuments({ formData: formData }).then((res) => {
                    if (res.data) {
                        message.success('Паспорт загружен')
                        setOpen(false)
                    } else {
                        message.error(res.error.data.file[0])
                        console.log(res)
                    }
                })
                setFile()
                break
            case 'Диплом':
                formData.append('file', file)
                formData.append('document_type', 'DIPLOMA')
                formData.append('name', valRef.current.input.value)
                postDocuments({ formData: formData }).then((res) => {
                    if (res.data) {
                        message.success('Диплом загружен')
                        setOpen(false)
                    } else {
                        message.error(res.error.data.file[0])
                    }
                })
                setFile()
                break
            case 'Образование':
                formData.append('file', file)
                formData.append('document_type', 'TITLESDEGREES')
                formData.append('name', valRef.current.input.value)
                postDocuments({ formData: formData }).then((res) => {
                    if (res.data) {
                        message.success('Документ об образовании загружен')
                        setOpen(false)
                    } else {
                        message.error(res.error.data.file[0])
                    }
                })
                setFile()
                break
        }
    }

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
                    <Button
                        key="submit"
                        type="primary"
                        onClick={onSubmit}
                        disabled={value ? false : true}
                    >
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
                        action="none"
                        {...props}
                        name="passport"
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

UDAddModal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
}

export default UDAddModal
