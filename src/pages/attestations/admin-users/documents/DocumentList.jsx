import { useState } from 'react'

import { Button } from 'antd'
import Table from 'antd/lib/table'

import DocumentsModal from '../components/modals/DocumentsModal'

const DocumentList = ({ docs }) => {
    const [open, setOpen] = useState()
    const [data, setData] = useState()
    const columns = [
        {
            title: 'Название',
            dataIndex: 'file',
            key: 'file',
            render: (file) =>
                file ? (
                    <a href={file} target="_blank" rel="noopener noreferrer">
                        {decodeURI(file).split('/')[5]}
                    </a>
                ) : (
                    '-'
                ),
        },
        {
            title: 'Тип документа',
            dataIndex: 'document_type',
            key: 'document_type',
            filters: [
                {
                    text: 'Диплом',
                    value: 'DIPLOMA',
                },
                {
                    text: 'Образование, ученая степень',
                    value: 'TITLESDEGREES',
                },
                {
                    text: 'Паспорт',
                    value: 'PASSPORT',
                },
            ],
            onFilter: (value, record) => record.document_type === value,
            render: (type) =>
                type === 'DIPLOMA'
                    ? 'Диплом'
                    : type === 'TITLESDEGREES'
                    ? 'Образование, ученая степень'
                    : type === 'PASSPORT'
                    ? 'Паспорт'
                    : '',
        },
        {
            title: 'Описание',
            dataIndex: 'name',
            key: 'name',
            render: (name) => (name ? name : '-'),
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (text, record) => (
                <Button
                    type="primary"
                    onClick={() => {
                        setOpen(true)
                        setData(record)
                    }}
                >
                    Посмотреть
                </Button>
            ),
        },
    ]
    return (
        <div>
            <Table dataSource={docs} columns={columns} rowKey="id" />
            <DocumentsModal open={open} setOpen={setOpen} data={data} />
        </div>
    )
}

export default DocumentList
