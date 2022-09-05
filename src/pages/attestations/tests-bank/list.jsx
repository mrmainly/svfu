import { useState, useEffect } from 'react'
import { Pagination } from 'antd'

import TBAddModal from '../components/modals/tbaddmodal'
import { useGetAttestationsTestsBankQuery } from '../../../services/AttestationService'

import TestsBankTable from '../components/tables/TestsBankTable'
import { MyButton } from '../../../components'

const TestsBank = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const { data, isLoading } = useGetAttestationsTestsBankQuery({ currentPage: currentPage })
    const [modalNewTest, setModalNewTest] = useState(false)
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])
    return (
        <div>
            <MyButton onClick={() => setModalNewTest(true)} style={{ marginBottom: 20 }}>
                Создать новый тест
            </MyButton>
            <TBAddModal open={modalNewTest} setOpen={setModalNewTest} />
            <TestsBankTable data={data?.results} loading={isLoading} />
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

export default TestsBank
