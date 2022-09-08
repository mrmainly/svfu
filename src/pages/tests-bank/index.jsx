import { useState, useEffect } from 'react'
import { Pagination, Input, Select } from 'antd'

import TBAddModal from './components/modals/TestBankAddModal'
import { useGetAttestationsTestsBankQuery } from '../../services/AttestationService'
import { useGetToolsDirectionQuery } from '../../services/ToolsService'

import TestsBankTable from './components/table/TestBankTable'
import { MyButton } from '../../components'
import './test-bank.css'

const TestsBank = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    const [directionName, setDirectionName] = useState('')
    const [id, setId] = useState('')
    const { data, isLoading } = useGetAttestationsTestsBankQuery({
        currentPage: currentPage,
        name: name,
        is_active: status,
        direction_name: directionName,
        id: id,
    })
    const { data: directionSelect } = useGetToolsDirectionQuery()
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
            <div className="inputs-container">
                <Input.Search
                    placeholder="Название квалификации"
                    enterButton
                    onSearch={(value) => {
                        const currValue = value
                        setName(currValue)
                    }}
                    className="input-search"
                ></Input.Search>
                <Select
                    showSearch
                    className="input-search"
                    placeholder="Квалификация"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.children.includes(input)}
                    filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                    onChange={(value) => setDirectionName(value)}
                >
                    {directionSelect?.map((item, index) => (
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
            {modalNewTest && <TBAddModal open={modalNewTest} setOpen={setModalNewTest} />}
            <TestsBankTable data={data?.results} loading={isLoading} setId={setId} />
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
