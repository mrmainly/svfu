import React, { useState, useEffect } from 'react'
import TestResultTable from './components/table'
import { Pagination, Input, Select } from 'antd'

import { useGetModeratorResultQuery } from '../../services/ModeratorService'
import './moderator-test-result.css'

const ModeratorTestResult = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [direction, setDirection] = useState('')
    const [userId, setUserId] = useState('')
    const [statusResult, setStatusResult] = useState('')
    const [ordering, setOrdering] = useState('')

    const { data, isLoading } = useGetModeratorResultQuery({
        currentPage: currentPage,
        direction: direction,
        userId: userId,
        statusResult: statusResult,
        ordering: ordering,
    })
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])
    const statusSelect = [
        {
            text: '',
            value: '',
        },
        {
            text: 'Ожидание',
            value: 'WAITING',
        },
        {
            text: 'Отклонен',
            value: 'REJECTED',
        },
        {
            text: 'Отменен',
            value: 'CANCELLED',
        },
        {
            text: 'Проверяется экспертами',
            value: 'CHECKED_BY_EXPERTS',
        },
        {
            text: 'Проверено экспертами',
            value: 'FINISHED_BY_EXPERTS',
        },
        {
            text: 'Эксперт (пред.) проверяет',
            value: 'CHECKED_BY_MAIN_EXPERT',
        },
        {
            text: 'Проверено экспертом (пред.)',
            value: 'FINISHED_BY_MAIN_EXPERT',
        },
        {
            text: 'Проверяется модераторами',
            value: 'CHECKED_BY_MODERATORS',
        },
        {
            text: 'Проверено модераторами',
            value: 'FINISHED_BY_MODERATORS',
        },
        {
            text: 'Модератор (пред.) проверяет',
            value: 'CHECKED_BY_MAIN_MODERATOR',
        },
        {
            text: 'Проверено модератором (пред.)',
            value: 'FINISHED_BY_MAIN_MODERATOR',
        },
        {
            text: 'Завершен',
            value: 'FINISHED',
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
                        setDirection(currValue)
                    }}
                    className="input-search"
                ></Input.Search>
                <Input.Search
                    placeholder="ID аттестуемого"
                    enterButton
                    onSearch={(value) => {
                        const currValue = value
                        setUserId(currValue)
                    }}
                    className="input-search"
                ></Input.Search>
                <Select
                    placeholder="Статус"
                    className="input-search"
                    onChange={(value) => setStatusResult(value)}
                >
                    {statusSelect?.map((item, index) => (
                        <Select.Option value={item.value} key={index}>
                            {item.text}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <TestResultTable data={data?.results} loading={isLoading} setOrdering={setOrdering} />
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

export default ModeratorTestResult
