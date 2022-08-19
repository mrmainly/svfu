import { useState } from 'react'
import AQEditModal from '../modals/aqeditmodal'
import Table from 'antd/lib/table'
import ROUTES from '../../../../routes'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const AttestationsQualificationsTable = ({ data, loading }) => {
    const [currentData, setCurrentData] = useState([])
    const [modalEditQuali, setModalEditQuali] = useState(false)

    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Название квалификации', dataIndex: 'name', key: 'name' },
        {
            title: 'Тег',
            dataIndex: 'tag_direction',
            key: 'tag_direction',
            render: (tag_direction) => <>{tag_direction.name}</>,
        },
        { title: 'Описание', dataIndex: 'description', key: 'description' },
        {
            title: 'Статус',
            dataIndex: 'is_active',
            key: 'is_active',
            render: (is_active) => (is_active ? 'Активна' : 'Не активна'),
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id) => (
                <Button
                    type="primary"
                    onClick={() => {
                        const itemData = data?.filter((e) => e.id === id)
                        setCurrentData(itemData)
                        setModalEditQuali(true)
                    }}
                >
                    Изменить
                </Button>
            ),
        },
    ]
    return (
        <>
            <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />
            <AQEditModal open={modalEditQuali} setOpen={setModalEditQuali} dataList={currentData} />
        </>
    )
}

export default AttestationsQualificationsTable
