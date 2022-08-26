import Table from 'antd/lib/table'

const IndividualTable = (props) => {
    const data = props?.data
    const columns = props?.columns

    return (
        <>
            <Table columns={columns} dataSource={data} rowKey="id" />
        </>
    )
}

export default IndividualTable
