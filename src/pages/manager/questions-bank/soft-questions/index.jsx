import { useState, useEffect } from 'react'
import { Pagination, Select, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

import SoftQuestionTable from './compoents/table/SoftQuestionTable'
import { useGetSoftQuestionListQuery } from '../../../../services/manager/question-bank/SoftQuestion'
import { useGetToolsDirectionQuery } from '../../../../services/ToolsService'
import { MyButton } from '../../../../components'
import '../questions-bank.css'
import ROUTES from '../../../../routes'

const SoftQuestions = () => {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [id, setId] = useState('')
    const [is_active, setIs_active] = useState('')
    const [name, setName] = useState('')
    const [direction, setDirection] = useState('')
    const { data, isFetching } = useGetSoftQuestionListQuery({
        currentPage: currentPage,
        id: id,

        is_active: is_active,
        name: name,
        direction: direction,
    })
    const { data: directionSelect } = useGetToolsDirectionQuery()
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
        console.log(data)
    }, [data])

    return (
        <div>
            <MyButton style={{ marginBottom: 16 }} onClick={() => navigate(ROUTES.NEW_QUESTION)}>
                Создать вопрос
            </MyButton>
            <div className="inputs-container">
                <Input.Search
                    placeholder="Название вопроса"
                    enterButton
                    onSearch={(value) => {
                        setName(value)
                    }}
                    className="input-search"
                />
                <Select
                    showSearch
                    className="input-search"
                    placeholder="Квалификация"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.children.includes(input)}
                    filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                    onChange={(value) => setDirection(value)}
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
                    onChange={(value) => setIs_active(value)}
                >
                    <Select.Option value="">Все статусы</Select.Option>
                    <Select.Option value="true">Активна</Select.Option>
                    <Select.Option value="false">Не активна</Select.Option>
                </Select>
            </div>
            <SoftQuestionTable data={data?.results} loading={isFetching} setId={setId} />
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

export default SoftQuestions
