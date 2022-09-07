import { useState, useEffect } from 'react'
import { Pagination, Input, Select } from 'antd'

import TBAddModal from './components/modals/TestBankAddModal'
import {
    useGetAttestationsTestsBankQuery,
    useGetAttestationsQualificationQuery,
} from '../../services/AttestationService'

import TestsBankTable from './components/tables/TestBankTable'
import { MyButton } from '../../components'

const TestsBank = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    const [directionName, setDirectionName] = useState('')
    const { data, isLoading } = useGetAttestationsTestsBankQuery({
        currentPage: currentPage,
        name: name,
        is_active: status,
        direction_name: directionName,
    })
    const { data: directionSelect } = useGetAttestationsQualificationQuery({
        is_active: '',
        name: '',
        tag: '',
        id: '',
    })
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
            <div
                style={{
                    display: 'flex',
                    marginBottom: 16,
                    justifyContent: 'start',
                    gap: 16,
                }}
            >
                <Input.Search
                    placeholder="Название квалификации"
                    enterButton
                    onSearch={(value) => {
                        const currValue = value
                        setName(currValue)
                    }}
                    style={{
                        width: '33%',
                    }}
                ></Input.Search>
                <Select
                    showSearch
                    style={{
                        width: 200,
                    }}
                    placeholder="Search to Select"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.children.includes(input)}
                    filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                    onChange={(value) => setDirectionName(value)}
                >
                    {directionSelect?.results?.map((item, index) => (
                        <Select.Option value={item.name} key={index}>
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
                <Select
                    placeholder="Статус"
                    style={{
                        width: '33%',
                    }}
                    onChange={(value) => setStatus(value)}
                >
                    <Select.Option value="">Все статусы</Select.Option>
                    <Select.Option value="true">Активна</Select.Option>
                    <Select.Option value="false">Не активна</Select.Option>
                </Select>
            </div>
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
