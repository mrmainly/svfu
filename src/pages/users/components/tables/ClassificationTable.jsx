import Table from 'antd/lib/table'
import { Button } from 'antd'

const ClassificationTable = () => {
    const data = [
        {
            id: 1,
            classification: 'Инженер',
            date: '10.01.2022',
            startDate: '10.01.2016',
            finishDate: '10.01.2016',
        },
        {
            id: 2,
            classification: 'Техник',
            date: '10.01.2016',
            startDate: '10.01.2016',
            finishDate: '10.01.2016',
        },
    ]

    const columns = [
        { title: '№ документа', dataIndex: 'id', key: 'id' },
        { title: 'Название классификации', dataIndex: 'classification', key: 'classification' },
        { title: 'Дата выдачи', dataIndex: 'date', key: 'date' },
        { title: 'Дата старта обучения', dataIndex: 'startDate', key: 'startDate' },
        { title: 'Дата окончания обучения', dataIndex: 'finishDate', key: 'finishDate' },
        {
            title: 'Посмотреть',
            dataIndex: 'id',
            key: 'x',
            render: (id) => <Button type='primary'>Посмотреть</Button>,
        },
    ]

    return (
        <>
            <Table columns={columns} dataSource={data} rowKey="id" />
        </>
    )
}

export default ClassificationTable
