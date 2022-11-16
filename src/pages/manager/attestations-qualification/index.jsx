import { useState, useEffect } from 'react'
import { Input, Pagination, Select } from 'antd'

import AttestationsQualificationsTable from './compoents/table'
import { MyButton } from '../../../components'
import './attestations-qualification.css'

// const LazyAqAddModal = lazy(() => import('./compoents/modals/aqaddmodal'))
import AQAddModal from './compoents/modals/aqaddmodal'

import {
    useGetAttestationsQualificationQuery,
} from '../../../services/manager/AttestationQualification'

const AttestationsQualifications = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    const [id, setId] = useState('')
    const { data, isFetching } = useGetAttestationsQualificationQuery({
        currentPage: currentPage,
        name: name,
        is_active: status,
        id: id,
    })
    const [modalNewQuali, setModalNewQuali] = useState(false)
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])

    //fix
    const handleQualificationFilter = (value) => {
        const currValue = value
        setName(currValue)
    }

    return (
        <div>
            <div className="inputs-container">
                <MyButton onClick={() => setModalNewQuali(true)}>Создать квалификацию</MyButton>
            </div>

            <div className="inputs-container">
                <Input.Search
                    placeholder="Квалификация"
                    enterButton
                    onSearch={handleQualificationFilter}
                    className="input-search"
                />
                <Select
                    placeholder="Статус"
                    className="input-search"
                    onChange={(value) => setStatus(value)}
                >
                    <Select.Option value="">Все статусы</Select.Option>
                    <Select.Option value="true">Активна</Select.Option>
                    <Select.Option value="false">Не активна</Select.Option>
                </Select>
            </div>
            <AQAddModal open={modalNewQuali} setOpen={setModalNewQuali} />
            <AttestationsQualificationsTable
                data={data?.results}
                loading={isFetching}
                setId={setId}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination
                    defaultCurrent={1}
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

export default AttestationsQualifications
