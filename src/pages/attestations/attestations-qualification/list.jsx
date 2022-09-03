import { useState, useEffect } from 'react'
import { Input, Pagination } from 'antd'

import AttestationsQualificationsTable from '../components/tables/AttestationsQualificationsTable'
import AQAddModal from '../components/modals/aqaddmodal'
import { MyButton } from '../../../components'

import { useGetAttestationsQualificationQuery } from '../../../services/AttestationService'

const AttestationsQualifications = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const { data, isLoading } = useGetAttestationsQualificationQuery({ currentPage: currentPage })
    const [modalNewQuali, setModalNewQuali] = useState(false)
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])
    return (
        <div>
            <MyButton style={{ marginBottom: 16 }} onClick={() => setModalNewQuali(true)}>
                Создать новую квалификацию
            </MyButton>
            <AQAddModal open={modalNewQuali} setOpen={setModalNewQuali} />
            <AttestationsQualificationsTable data={data?.results} loading={isLoading} />
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

export default AttestationsQualifications
