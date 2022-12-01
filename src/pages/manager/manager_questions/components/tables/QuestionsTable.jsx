import Table from 'antd/lib/table'
import { Button } from 'antd'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import { useGetToolsDirectionQuery } from '../../../../../services/ToolsService'
import ROUTES from '../../../../../routes'

const QuestionsTable = ({ data, loading, setId }) => {
    const { data: dataDirection } = useGetToolsDirectionQuery()

    const navigate = useNavigate()

    const onTableChange = (newPagination, filters, sorter) => {
        if (sorter?.order === 'descend') {
            setId('-id')
        } else if (sorter?.order === 'ascend') {
            setId('id')
        } else {
            setId('')
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
            title: 'Текст вопроса',
            dataIndex: 'description',
            key: 'description',
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
            title: 'Сложность',
            dataIndex: 'difficulty',
            key: 'difficulty',

            render: (difficulty) =>
                difficulty === 'BEGINNER'
                    ? 'Легкий'
                    : difficulty === 'ADVANCED'
                    ? 'Средний'
                    : difficulty === 'EXPERT'
                    ? 'Сложный'
                    : 'Открытый',
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
                <Button
                    type="primary"
                    onClick={() => {
                        navigate(ROUTES.MANAGER_QUESTIONS_EDIT_PAGE, {
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

QuestionsTable.propTypes = {
    data: PropTypes.array,
    loading: PropTypes.bool,
    setId: PropTypes.func,
    handleOpenEditQuestionModal: PropTypes.func,
    setCurrentData: PropTypes.func,
}

export default QuestionsTable
