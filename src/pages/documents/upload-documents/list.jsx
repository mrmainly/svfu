import { useState, useEffect } from 'react'
import { Pagination, Input, Select } from 'antd'

import UploadDocumentsTable from '../components/tables/UploadDocumentsTable'
import UDAddModal from '../components/modals/udaddmodal'
import { MyButton } from '../../../components'
import './upload-documents.css'

import { useGetDocumentsQuery } from '../../../services/documents/Documents'

const UploadDocuments = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [documentType, setDocumentType] = useState('')
    const [name, setName] = useState('')
    const { data, isLoading } = useGetDocumentsQuery({
        currentPage: currentPage,
        documentType: documentType,
        name: name,
    })
    const [modalNewDoc, setModalNewDoc] = useState(false)
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])
    const selectDocumentType = [
        {
            text: 'Все документы',
            value: '',
        },
        {
            text: 'Паспорт',
            value: 'PASSPORT',
        },
        {
            text: 'Диплом',
            value: 'Diploma',
        },
        {
            text: 'Образование, ученое звание и учёные степени',
            value: 'TITLESDEGREES',
        },
    ]
    return (
        <div>
            <MyButton style={{ marginBottom: 20 }} onClick={() => setModalNewDoc(true)}>
                Добавить документ
            </MyButton>
            <div className="inputs-container">
                <Input.Search
                    placeholder="Описание"
                    enterButton
                    onSearch={(value) => {
                        const currValue = value
                        setName(currValue)
                    }}
                    className="input-search"
                ></Input.Search>
                <Select
                    placeholder="Тип документа"
                    className="input-search"
                    onChange={(value) => setDocumentType(value)}
                >
                    {selectDocumentType?.map((item, index) => (
                        <Select.Option value={item.value} key={index}>
                            {item.text}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <UDAddModal open={modalNewDoc} setOpen={setModalNewDoc} />
            <UploadDocumentsTable data={data?.results} loading={isLoading} />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination
                    defaultCurrent={1}
                    current={currentPage}
                    total={totalPage}
                    pageSize={30}
                    style={{ marginTop: 20 }}
                    onChange={onChange}
                    showSizeChanger={false}
                />
            </div>
        </div>
    )
}

export default UploadDocuments
