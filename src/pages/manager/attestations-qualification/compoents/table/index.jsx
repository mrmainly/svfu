import { useState } from 'react'
import PropTypes from 'prop-types'

import AQEditModal from '../modals/aqeditmodal'
import Table from 'antd/lib/table'
import { Button } from 'antd'

const AttestationsQualificationsTable = ({ data, loading, setId }) => {
    const [currentData, setCurrentData] = useState([])
    const [modalEditQuali, setModalEditQuali] = useState(false)
    const onTableChange = (newPagination, filters, sorter) => {
        if (sorter?.order === 'descend') {
            {
                setId('-id')
            }
        } else if (sorter?.order === 'ascend') {
            {
                setId('id')
            }
        } else {
            {
                setId('')
            }
        }
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
        },
        {
            title: 'Название квалификации',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Тег',
            dataIndex: 'tag_direction',
            key: 'tag_direction',
            render: (tag_direction) => <>{tag_direction?.name}</>,
        },
        {
            title: 'Описание',
            dataIndex: 'description',
            key: 'description',
        },
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
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey="id"
                pagination={false}
                scroll={{ x: true }}
                onChange={onTableChange}
            />
            <AQEditModal open={modalEditQuali} setOpen={setModalEditQuali} dataList={currentData} />
        </>
    )
}

AttestationsQualificationsTable.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    setId: PropTypes.func,
}

export default AttestationsQualificationsTable
