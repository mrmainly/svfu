import { useState, useMemo } from 'react'

import Table from 'antd/lib/table'
import { Button } from 'antd'

import PropTypes from 'prop-types'

import TBEditModal from '../modals/TestBankEditModal'

const TestsBankTable = ({ data, loading, setId }) => {
    const [currentData, setCurrentData] = useState([])
    const [modalEditTB, setModalEditTB] = useState(false)

    const handleClickTable = (id) =>
        useMemo(() => {
            const itemData = data?.filter((e) => e.id === id)
            setCurrentData(itemData)
            setModalEditTB(true)
        }, [id])

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
            title: '№',
            dataIndex: 'id',
            key: 'id',
            sorter: true,
        },
        {
            title: 'Название тестов',
            dataIndex: 'name',
            key: 'name',
        },
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
            title: 'Статус',
            dataIndex: 'is_active',
            key: 'is_active',

            render: (is_active) =>
                is_active === true ? 'Активна' : is_active === false ? 'Не активна' : '',
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id) => (
                <Button type="primary" onClick={handleClickTable(id)}>
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
            <TBEditModal open={modalEditTB} setOpen={setModalEditTB} dataList={currentData} />
        </>
    )
}

TestsBankTable.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    setId: PropTypes.func,
}

export default TestsBankTable
