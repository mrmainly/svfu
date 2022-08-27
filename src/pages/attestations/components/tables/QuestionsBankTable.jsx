import { useState } from 'react'
import Table from 'antd/lib/table'
import QBEditModal from '../modals/qbeditmodal'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

const QuestionsBankTable = ({ data, loading }) => {
    const [currentData, setCurrentData] = useState()
    const [modalEditQuestionsBank, setModalEditQuestionsBank] = useState(false)

    const columns = [
        { title: '№', dataIndex: 'id', key: 'id' },
        { title: 'Текст вопроса', dataIndex: 'description', key: 'description' },
        { title: 'Квалификации', dataIndex: 'direction', key: 'direction' },
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
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (text, record) => (
                <Button
                    type="primary"
                    onClick={() => {
                        setCurrentData(record)
                        setModalEditQuestionsBank(true)
                    }}
                >
                    Изменить
                </Button>
            ),
        },
    ]

    return (
        <>
            <QBEditModal
                open={modalEditQuestionsBank}
                setOpen={setModalEditQuestionsBank}
                dataList={currentData}
            />
            <Table columns={columns} dataSource={data} loading={loading} rowKey="id" />
        </>
    )
}

export default QuestionsBankTable
