import { useState, useEffect, lazy } from 'react'
import { Pagination, Input, Select } from 'antd'

import { useGetAttestationsTestsBankQuery } from '../../../services/manager/TestsBank'
import { useGetToolsDirectionQuery } from '../../../services/ToolsService'

import TestsBankTable from './components/table/TestBankTable'
import { MyButton } from '../../../components'
import './test-bank.css'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../../routes'

const LazyTBAddModal = lazy(() => import('./components/modals/TestBankAddModal'))

const TestsBank = () => {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [name, setName] = useState('')
    const [status, setStatus] = useState('')
    const [directionName, setDirectionName] = useState('')
    const [id, setId] = useState('')
    const [unitType, setUnitType] = useState('')
    const { data, isFetching } = useGetAttestationsTestsBankQuery({
        currentPage: currentPage,
        name: name,
        is_active: status,
        direction_name: directionName,
        id: id,
        unit_type: unitType,
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
            <MyButton onClick={() => navigate(ROUTES.TEST_TESTS)} style={{ marginBottom: 20 }}>
                Создать новый тестовый тест
            </MyButton>
            <div className="inputs-container">
                <Input.Search
                    placeholder="Название теста"
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
                    <Select.Option value=""> Все квалификации</Select.Option>
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
                <Select
                    placeholder="Тип вопроса"
                    className="input-search"
                    onChange={(value) => setUnitType(value)}
                >
                    <Select.Option value="">Все статусы</Select.Option>
                    <Select.Option value="SOFT">SOFT</Select.Option>
                    <Select.Option value="HARD">HARD</Select.Option>
                </Select>
            </div>
            <LazyTBAddModal open={modalNewTest} setOpen={setModalNewTest} />
            <TestsBankTable data={data?.results} loading={isFetching} setId={setId} />
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

export default TestsBank
