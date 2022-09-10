import { useState } from 'react'
import Table from 'antd/lib/table'
import { Button } from 'antd'
import PropTypes from 'prop-types'

import UDEditModal from '../modals/udeditmodal'

const UploadDocumentsTable = ({ data, loading }) => {
    const [currentData, setCurrentData] = useState([])
    const [modalEditDocs, setModalEditDocs] = useState(false)

    const columns = [
        {
            title: 'Документ',
            dataIndex: 'file',
            key: 'file',
            render: (file) => (
                <a href={file} target="_blank" rel="noopener noreferrer">
                    {decodeURI(file).split('/')[5]}
                </a>
            ),
        },
        {
            title: 'Тип документа',
            dataIndex: 'document_type',
            key: 'document_type',

            render: (document_type) =>
                document_type === 'DIPLOMA'
                    ? 'Диплом'
                    : document_type === 'PASSPORT'
                    ? 'Паспорт'
                    : document_type === 'TITLESDEGREES'
                    ? 'Образование, ученое звание и учёные степени'
                    : null,
        },
        {
            title: 'Описание',
            dataIndex: 'name',
            key: 'name',
        },
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
    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey="id"
                pagination={false}
                scroll={{ x: true }}
            />
            <UDEditModal open={modalEditDocs} setOpen={setModalEditDocs} dataList={currentData} />
        </>
    )
}

UploadDocumentsTable.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
}

export default UploadDocumentsTable
