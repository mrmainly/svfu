import { useState } from 'react'
import { Modal, Input, Row, Col, Form } from 'antd'

import UploadDocumentsTable from '../components/tables/UploadDocumentsTable'
import UDAddModal from '../components/modals/udaddmodal'
import { MyButton } from '../../../components'

import { useGetDocumentsQuery } from '../../../services/DocumentsService'

const { Search } = Input

const UploadDocuments = () => {
    // const { data, isLoading } = useGetDocumentsQuery()
    // const [modalNewDoc, setModalNewDoc] = useState(false)
    // const onSearch = (value) => console.log(value)
    return (
        <div>
            fdasdf
            {/* <Row gutter={10} style={{ marginBottom: '10px' }}>
                <Col>
                    <MyButton onClick={() => setModalNewDoc(true)}>Создать новый документ</MyButton>
                </Col>
                <Col>
                    <Search
                        size="large"
                        placeholder="Поиск..."
                        onSearch={onSearch}
                        enterButton
                        style={{ borderRadius: 4 }}
                    />
                </Col>
            </Row>
            {/* <UDAddModal open={modalNewDoc} setOpen={setModalNewDoc} /> */}
            {/* <UploadDocumentsTable data={data} loading={isLoading} /> */}
        </div>
    )
}

export default UploadDocuments
