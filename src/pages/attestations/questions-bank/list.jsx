import { useState, useEffect } from 'react'
import { Pagination } from 'antd'

import QuestionsBankTable from '../components/tables/QuestionsBankTable'
import QBAddModal from '../components/modals/qbaddmodal'
import { useGetAttestationsQuestionsBankQuery } from '../../../services/AttestationService'

import { MyButton } from '../../../components'

const QuestionsBank = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const { data, isLoading } = useGetAttestationsQuestionsBankQuery({ currentPage: currentPage })
    const [modalNewQuestion, setModalNewQuestion] = useState(false)
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])
    return (
        <div>
            <MyButton style={{ marginBottom: 16 }} onClick={() => setModalNewQuestion(true)}>
                Создать вопрос
            </MyButton>
            <QBAddModal open={modalNewQuestion} setOpen={setModalNewQuestion} />
            <QuestionsBankTable data={data?.results} loading={isLoading} />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination
                    defaultCurrent={1}
                    total={totalPage}
                    pageSize={30}
                    style={{ marginTop: 20 }}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

export default QuestionsBank
