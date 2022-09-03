import { useState, useEffect } from 'react'
import { Pagination } from 'antd'

import MyQualificationTable from '../components/tables/MyQualificationTable'
import MQAddModal from '../components/modals/mqaddmodal'
import { useGetQualificationsQuery } from '../../../services/QualificationsService'
import { MyButton } from '../../../components'

const MyQualification = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const { data, isLoading } = useGetQualificationsQuery({ currentPage: currentPage })
    const [modalNewQualification, setModalNewQualification] = useState(false)

    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])

    return (
        <div>
            <MyButton style={{ marginBottom: 20 }} onClick={() => setModalNewQualification(true)}>
                Загрузить мою квалификацию
            </MyButton>
            <MQAddModal open={modalNewQualification} setOpen={setModalNewQualification} />
            <MyQualificationTable data={data?.results} loading={isLoading} />
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

export default MyQualification
