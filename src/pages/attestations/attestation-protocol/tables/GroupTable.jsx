import Table from 'antd/lib/table'
import PropTypes from 'prop-types'

const GroupTable = (props) => {
    const data = props?.data
    const columns = props?.columns

    return (
        <>
            <Table columns={columns} dataSource={data} rowKey="id" />
        </>
    )
}

GroupTable.propTypes = {
    props: PropTypes.object,
    data: PropTypes.array,
    columns: PropTypes.any,
}

export default GroupTable
