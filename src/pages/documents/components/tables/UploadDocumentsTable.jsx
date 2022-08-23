import { useState } from 'react'
import Table from 'antd/lib/table'
import ROUTES from '../../../../routes'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const UploadDocumentsTable = ({ data, loading }) => {
    const [currentData, setCurrentData] = useState([])
    const [modalEditQuali, setModalEditQuali] = useState(false)

    const columns = [
        { title: 'Документ', dataIndex: 'id', key: 'id' },
        { title: 'Название квалификации', dataIndex: 'name', key: 'name' },
        // {
        //     title: 'Тип документа',
        //     dataIndex: 'diploma' || 'titles_degrees',
        //     key: 'diploma' || 'titles_degrees',
        //     render:
        //         ((diploma) => <>{diploma.name}</>) ||
        //         ((titles_degrees) => <>{titles_degrees.name}</>),
        // },
        // { title: 'Описание', dataIndex: 'description', key: 'description' },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id) => (
                <Button
                    type="primary"
                    // onClick={() => {
                    //     const itemData = data?.filter((e) => e.id === id)
                    //     setCurrentData(itemData)
                    //     setModalEditQuali(true)
                    // }}
                >
                    Изменить
                </Button>
            ),
        },
    ]
    const inputs = [
        {
            title: 'Диплом:',
            value: data.diploma,
        },
        {
            title: 'Образование, ученое звание и учёные степени:',
            value: data.titles_degrees,
        },
    ]
    return (
        <>
            <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />
            {/* <AQEditModal open={modalEditQuali} setOpen={setModalEditQuali} dataList={currentData} /> */}
        </>
    )
}

export default UploadDocumentsTable
