import Table from 'antd/lib/table'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { useGetToolsDirectionQuery } from '../../../../../../services/ToolsService'
import ROUTES from '../../../../../../routes'

const SoftQuestionTable = ({ data, loading, setId }) => {
    const { data: dataDirection } = useGetToolsDirectionQuery()

    const navigate = useNavigate()

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
            title: 'Название вопроса',
            dataIndex: 'name',
            key: 'name',
            width: 700,
        },
        {
            title: 'Квалификации',
            dataIndex: 'direction',
            key: 'direction',
            render: (direction) =>
                direction
                    .map((item) => {
                        return dataDirection
                            ?.filter((dir) => dir.id === item)
                            ?.map((item) => {
                                return item?.name
                            })
                    })
                    .join(', '),
        },

        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id) => (
                <Button
                    type="primary"
                    onClick={() => {
                        navigate(ROUTES.EDIT_SOFT_QUESTION, {
                            state: {
                                id: id,
                            },
                        })
                    }}
                >
                    Изменить
                </Button>
            ),
        },
    ]

    return (
        <Table
            columns={columns}
            dataSource={data}
            loading={loading}
            rowKey="id"
            pagination={false}
            scroll={{ x: true }}
            onChange={onTableChange}
        />
    )
}

SoftQuestionTable.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    setId: PropTypes.func,
}

export default SoftQuestionTable
