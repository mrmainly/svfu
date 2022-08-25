import { useState } from 'react'
import { Modal, Row, Col, Form, Input, Select, TimePicker, InputNumber, Typography } from 'antd'

import QuestionsBankTable from '../components/tables/QuestionsBankTable'
import QBAddModal from '../components/modals/qbaddmodal'
import { useGetAttestationsQuestionsBankQuery } from '../../../services/AttestationService'

import { MyButton } from '../../../components'
const { Search } = Input
const { Option } = Select

const QuestionsBank = () => {
    const { data, isLoading } = useGetAttestationsQuestionsBankQuery('')

    const [modalNewQuestion, setModalNewQuestion] = useState(false)
    const onSearch = (value) => console.log(value)
    return (
        <div>
            <MyButton onClick={() => setModalNewQuestion(true)}>Создать вопрос</MyButton>
            <QBAddModal open={modalNewQuestion} setOpen={setModalNewQuestion} />
            <QuestionsBankTable data={data?.results} loading={isLoading} />
        </div>
    )
}

export default QuestionsBank
