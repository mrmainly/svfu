import { useState } from 'react'
import Table from 'antd/lib/table'
import ROUTES from '../../../../routes'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const QuestionsBankTable = ({ data, loading }) => {
    const [currentData, setCurrentData] = useState([])
    const [modalEditQuestionsBank, setModalEditQuestionsBank] = useState(false)

    const columns = [
        { title: '№', dataIndex: 'id', key: 'id' },
        { title: 'Текст вопроса', dataIndex: 'name', key: 'name' },
        { title: 'Квалификации', dataIndex: 'direction', key: 'direction' },
        {
            title: 'Сложность',
            dataIndex: 'difficulty',
            key: 'difficulty',
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id) => (
                <Button
                    type="primary"
                    // onClick={() => {
                    //     navigate(ROUTES.USERS_DETAIL + `/${id}`)
                    // }}
                >
                    Изменить
                </Button>
            ),
        },
    ]

    return (
        <>
            <Table columns={columns} dataSource={data} rowKey="id" />
        </>
    )
}

export default QuestionsBankTable
