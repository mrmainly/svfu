import { useState } from 'react'
import Table from 'antd/lib/table'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import UDEditModal from '../modals/udeditmodal'

const UploadDocumentsTable = ({ data, loading }) => {
    const [currentData, setCurrentData] = useState([])
    const [modalEditDocs, setModalEditDocs] = useState(false)

    const columns = [
        {
            title: 'Документ',
            dataIndex: 'document',
            key: 'document',
            render: (document) => (
                <a href={document} target="_blank">
                    {decodeURI(document).split('/')[5]}
                </a>
            ),
        },
        { title: 'Тип документа', dataIndex: 'type', key: 'type' },
        { title: 'Описание', dataIndex: 'name', key: 'name' },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (text, record) => (
                <Button
                    type="primary"
                    onClick={() => {
                        setCurrentData(record)
                        setModalEditDocs(true)
                    }}
                >
                    Изменить
                </Button>
            ),
        },
    ]
    const inputs = [
        {
            type: 'Паспорт',
            document: data?.passport,
            name: '',
        },
    ]
    {
        data?.diploma.map((item) =>
            inputs.push({ type: 'Диплом', document: item.file, id: item.id, name: item.name })
        )
    }
    {
        data?.titles_degrees.map((item) =>
            inputs.push({
                type: 'Образование, ученое звание и учёные степени',
                document: item.file,
                id: item.id,
                name: item.name,
            })
        )
    }
    console.log('cd', currentData)
    return (
        <>
            <Table columns={columns} dataSource={inputs} loading={loading} rowKey="id" />
            <UDEditModal open={modalEditDocs} setOpen={setModalEditDocs} dataList={currentData} />
        </>
    )
}

export default UploadDocumentsTable
