import { useState } from 'react'
import TBEditModal from '../modals/tbeditmodal'
import Table from 'antd/lib/table'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const TestsBankTable = ({ data, loading }) => {
    const [currentData, setCurrentData] = useState([])
    const [modalEditTB, setModalEditTB] = useState(false)
    const columns = [
        { title: '№', dataIndex: 'id', key: 'id' },
        { title: 'Название квалификации', dataIndex: 'name', key: 'name' },
        {
            title: 'Квалификация',
            dataIndex: 'direction',
            key: 'direction',
            render: (direction) => <>{direction?.name}</>,
        },
        {
            title: 'Вопросов',
            dataIndex: 'question_count',
            key: 'question_count',
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
                        setModalEditTB(true)
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
            <TBEditModal open={modalEditTB} setOpen={setModalEditTB} dataList={currentData} />
        </>
    )
}

export default TestsBankTable
