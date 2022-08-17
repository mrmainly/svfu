import Table from 'antd/lib/table'
import MyButton from '../../UI/button'

const AttestedTable = () => {
    const data = [
        {
            id: 1,
            fio: 'Иван Петров',
        },
    ]
    const columns = [
        { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'ФИО', dataIndex: 'fio', key: 'fio' },
        {
            title: 'Квалификации',
            dataIndex: 'classification',
            key: 'classification',
            render: (classification) => <MyButton>Посмотреть классификации</MyButton>,
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id) => <MyButton>Перейти</MyButton>,
        },
    ]

    return (
        <>
            <Table columns={columns} dataSource={data} rowKey="id" />
        </>
    )
}

export default AttestedTable
