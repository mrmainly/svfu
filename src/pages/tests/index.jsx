import React, { useState, useEffect } from 'react'

import AvailableTestTable from './components/table'
import { useGetTesterSurveyQuery } from '../../services/TesterService'
import { Pagination, Input, Select } from 'antd'
import './tests.css'

const Test = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [survey_status, setSurvey_status] = useState('')
    const [ordering, setOrdering] = useState('')
    const [name, setName] = useState('')
    const { data, isLoading } = useGetTesterSurveyQuery({
        currentPage: currentPage,
        survey_status: survey_status,
        name: name,
        ordering: ordering,
    })
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])
    const orderSelect = [
        {
            text: '-',
            value: '',
        },
        {
            text: 'По ID (возрастание)',
            value: 'id',
        },
        {
            text: 'По ID (убывание)',
            value: '-id',
        },
        {
            text: 'Начало аттестации (возрастание)',
            value: 'exam__date_start',
        },
        {
            text: 'Начало аттестации (убывание)',
            value: '-exam__date_start',
        },
        {
            text: 'Конец аттестации (возрастание)',
            value: 'exam__date_finish',
        },
        {
            text: 'Конец аттестации (убывание)',
            value: '-exam__date_finish',
        },
        {
            text: 'Время (возрастание)',
            value: 'exam__unit__test_time',
        },
        {
            text: 'Время (убывание)',
            value: '-exam__unit__test_time',
        },
    ]
    const statusSelect = [
        {
            text: '-',
            value: '',
        },
        {
            text: 'Ожидает',
            value: 'WAITING',
        },
        {
            text: 'Идет тест',
            value: 'IN_PROGRESS',
        },
        {
            text: 'На рассмотрении',
            value: 'ON_REVIEW',
        },
        {
            text: 'Рассмотрен',
            value: 'REVIEWED',
        },
        {
            text: 'Отменен',
            value: 'CANCELLED',
        },
        {
            text: 'Недоступен',
            value: 'UNAVAILABLE',
        },
    ]
    return (
        <div>
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
                    placeholder="Сортировка"
                    className="input-search"
                    onChange={(value) => setOrdering(value)}
                >
                    {orderSelect.map((item, index) => (
                        <Select.Option value={item.value} key={index}>
                            {item.text}
                        </Select.Option>
                    ))}
                </Select>
                <Select
                    placeholder="Статус"
                    className="input-search"
                    onChange={(value) => setSurvey_status(value)}
                >
                    {statusSelect.map((item, index) => (
                        <Select.Option value={item.value} key={index}>
                            {item.text}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <AvailableTestTable data={data?.results} loading={isLoading} />
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

export default Test
