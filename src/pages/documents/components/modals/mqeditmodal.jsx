import PropTypes from 'prop-types'

import { Modal, Form, Typography, Input, message, Upload, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'

import { MyButton } from '../../../../components'
import {
    usePatchQualificationIdMutation,
    useDeleteQualificationIdMutation,
} from '../../../../services/documents/Qualifications'

const { Text } = Typography

const MQEditModal = ({ open, setOpen, dataList }) => {

    const [patchQualificationId] = usePatchQualificationIdMutation()
    const [deleteQualification] = useDeleteQualificationIdMutation()

    const onSubmit = (data) => {
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('doc_id', data.doc_id)
        if (data.file?.fileList) {
            formData.append('file', data.file.fileList[0]?.originFileObj)
        }

        patchQualificationId({ id: data.doc_id, formData: formData }).then((res) => {
            if (res.data) {
                message.success('Квалификация изменена')
                setOpen(false)
            } else {
                message.error('Вы не ввели обязательные поля')
            }
        })
    }


    const defualtFileList = [
        {
            uid: '-1',
            name: 'Документ',
            status: 'done',
            url: `${dataList?.file}`,
        },
    ]

    const props = {
        beforeUpload: (file) => {
            const isPDF = file.type === 'application/pdf'

            if (!isPDF) {
                message.error(`${file.name} не является pdf файлом`)
                return isPDF || Upload.LIST_IGNORE
            } else if (file.fileList.length) {
                message.error(`вы не`)
            }
            return false
        },
    }
    return (
        <div>
            <Modal
                destroyOnClose={true}
                title="Изменить квалификацию"
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
                    <Button
                        size="large"
                        key="delete"
                        onClick={() =>
                            deleteQualification({ id: dataList.id }).then((res) => {
                                if (res.data) {
                                    message.success('Квалификация удалена')
                                    setOpen(false)
                                } else {
                                    message.error('Квалификация не удалена')
                                }
                            })
                        }
                        type="danger"
                    >
                        Удалить
                    </Button>,
                ]}
            >
                <Form
                    initialValues={{
                        ['doc_id']: dataList?.id,
                        ['name']: dataList?.name,
                        ['date_of_issue']: dataList?.date_of_issue,
                    }}
                    onFinish={onSubmit}
                    id="mqedit-form"
                >
                    <Form.Item
                        label={
                            <Text style={{ fontWeight: 600, fontSize: 16 }}>Номер документа</Text>
                        }
                        name="doc_id"
                        style={{ width: 350, fontWeight: 600, fontSize: 16 }}
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
                        style={{ width: 350, fontWeight: 600, fontSize: 16 }}
                        labelCol={{ span: 24 }}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text style={{ fontWeight: 600, fontSize: 16 }}>
                                Дата выдачи документа
                            </Text>
                        }
                        name="date_of_issue"
                        style={{ width: 350, fontWeight: 600, fontSize: 16 }}
                    >
                        <Text style={{ fontWeight: 400, fontSize: 16 }}>
                            {dataList?.date_of_issue?.substring(0, 10)}
                        </Text>
                    </Form.Item>
                    <Form.Item
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 20,
                        }}
                        name="file"
                        labelCol={{ span: 24 }}
                        required
                        label={
                            <Text style={{ fontWeight: 600, fontSize: 16 }}>Загрузить файл</Text>
                        }
                    >
                        <Upload
                            {...props}
                            multiple={false}
                            maxCount={1}
                            defaultFileList={dataList?.file === null ? null : defualtFileList}
                            accept=".pdf"
                        >
                            <Button icon={<UploadOutlined />}>Upload</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

MQEditModal.propTypes = {
    open: PropTypes.bool,
    setOpen: PropTypes.func,
    dataList: PropTypes.object,
}

export default MQEditModal
