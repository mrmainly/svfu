import { useState } from 'react'
import { Modal, Input, Row, Col, Form } from 'antd'

import UploadDocumentsTable from '../components/tables/UploadDocumentsTable'
import UDAddModal from '../components/modals/udaddmodal'
import { MyButton } from '../../../components'

import { useGetDocumentsQuery } from '../../../services/DocumentsService'

const { Search } = Input

const UploadDocuments = () => {
    const { data, isLoading } = useGetDocumentsQuery()
    const [modalNewDoc, setModalNewDoc] = useState(false)
    console.log('datares', data)
    const onSearch = (value) => console.log(value)
    return (
        <div>
            <MyButton style={{ marginBottom: 20 }} onClick={() => setModalNewDoc(true)}>
                Создать новый документ
            </MyButton>
            <UDAddModal open={modalNewDoc} setOpen={setModalNewDoc} />
            <UploadDocumentsTable data={data?.results} loading={isLoading} />
        </div>
    )
}

export default UploadDocuments