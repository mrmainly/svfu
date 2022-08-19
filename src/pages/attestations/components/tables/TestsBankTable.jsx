import { useState } from 'react'
import TBEditModal from '../modals/tbeditmodal'
import Table from 'antd/lib/table'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const TestsBankTable = ({ data, loading }) => {
    const [currentData, setCurrentData] = useState([])
    const [modalEditTB, setModalEditTB] = useState(false)
    const navigate = useNavigate()
    // console.log(data)
    // let newData = [...data]
    // newData?.map(
    //     (item) => (item['sum'] = item.beginner_count + item.advanced_count + item.expert_count)
    // )
    // console.log(newData)
    // const data = [
    //     {
    //         id: 12,
    //         name: 'Название_тестирования',
    //         qualification: 'Название_квалификации',
    //         questions: 10,
    //     },
    //     {
    //         id: 12,
    //         name: 'Название_тестирования',
    //         qualification: 'Название_квалификации',
    //         questions: 10,
    //     },
    // ]

    const columns = [
        { title: '№', dataIndex: 'id', key: 'id' },
        { title: 'Название квалификации', dataIndex: 'test_time', key: 'test_time' },
        { title: 'Квалификация', dataIndex: 'direction', key: 'direction' },
        {
            title: 'Вопросов',
            dataIndex: 'beginner_count',
            key: 'beginner_count',
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id) => (
                <Button
                    type="primary"
                    onClick={() => {
                        const itemData = data.filter((e) => e.id === id)
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
            <Table columns={columns} dataSource={data} rowKey="id" />
            <TBEditModal open={modalEditTB} setOpen={setModalEditTB} dataList={currentData} />
        </>
    )
}

export default TestsBankTable
