import { useState, useEffect } from 'react'
import { Pagination } from 'antd'

import UploadDocumentsTable from '../components/tables/UploadDocumentsTable'
import UDAddModal from '../components/modals/udaddmodal'
import { MyButton } from '../../../components'

import { useGetDocumentsQuery } from '../../../services/DocumentsService'

const UploadDocuments = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const { data, isLoading } = useGetDocumentsQuery({ currentPage: currentPage })
    const [modalNewDoc, setModalNewDoc] = useState(false)
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])
    return (
        <div>
            <MyButton style={{ marginBottom: 20 }} onClick={() => setModalNewDoc(true)}>
                Создать новый документ
            </MyButton>
            <UDAddModal open={modalNewDoc} setOpen={setModalNewDoc} />
            <UploadDocumentsTable data={data?.results} loading={isLoading} />
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

export default UploadDocuments
