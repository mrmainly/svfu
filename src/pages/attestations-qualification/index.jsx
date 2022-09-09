import { useState, useEffect } from 'react'
import { Input, Pagination, Select } from 'antd'

import AttestationsQualificationsTable from './compoents/table'
import AQAddModal from './compoents/modals/aqaddmodal'
import { MyButton } from '../../components'
import './attestations-qualification.css'

import {
    useGetAttestationsQualificationQuery,
    useGetAttestationsTagQuery,
} from '../../services/AttestationService'

const AttestationsQualifications = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [name, setName] = useState('')
    const [tag, setTag] = useState('')
    const [status, setStatus] = useState('')
    const [id, setId] = useState('')
    const { data, isLoading } = useGetAttestationsQualificationQuery({
        currentPage: currentPage,
        name: name,
        tag: tag,
        is_active: status,
        id: id,
    })
    const { data: directionTag } = useGetAttestationsTagQuery()
    const [modalNewQuali, setModalNewQuali] = useState(false)
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])
    return (
        <div>
            <div className="inputs-container">
                <MyButton onClick={() => setModalNewQuali(true)}>
                    Создать новую квалификацию
                </MyButton>
                <MyButton>Теги</MyButton>
            </div>

            <div className="inputs-container">
                <Input.Search
                    placeholder="Квалификация"
                    enterButton
                    onSearch={(value) => {
                        const currValue = value
                        setName(currValue)
                    }}
                    className="input-search"
                ></Input.Search>
                <Select
                    placeholder="Тег"
                    className="input-search"
                    onChange={(value) => setTag(value)}
                >
                    <Select.Option value=""> Все теги</Select.Option>
                    {directionTag?.results?.map((item, index) => (
                        <Select.Option value={item.name} key={index}>
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
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
                loading={isLoading}
                setId={setId}
            />
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
