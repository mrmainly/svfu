import React, { useState, useEffect } from 'react'
import TestProcessingTable from './compoents/table'
import { Pagination, Input, Select } from 'antd'

import { useGetTestProcessingQuery } from '../../../services/expert/TestProcessing'
import './test-processing.css'

const TestProcessing = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [direction, setDirection] = useState('')
    const [userId, setUserId] = useState('')
    const [statusResult, setStatusResult] = useState('')
    const [ordering, setOrdering] = useState('')
    const [totalPage, setTotalPage] = useState(30)

    const { data, isFetching } = useGetTestProcessingQuery({
        currentPage: currentPage,
        direction: direction,
        userId: userId,
        statusResult: statusResult,
        ordering: ordering,
        unit_type: '',
    })

    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])

    const onChange = (page) => {
        setCurrentPage(page)
    }
    const statusSelect = [
        {
            text: 'Все статусы',
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
                    placeholder="Тестирование"
                    enterButton
                    onSearch={(value) => {
                        const currValue = value
                        setDirection(currValue)
                    }}
                    className="input-search"
                ></Input.Search>
                <Input.Search
                    placeholder="Аттестуемый"
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
            <TestProcessingTable
                data={data?.results}
                loading={isFetching}
                setOrdering={setOrdering}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination
                    defaultCurrent={1}
                    total={totalPage}
                    pageSize={20}
                    style={{ marginTop: 20 }}
                    onChange={onChange}
                    showSizeChanger={false}
                />
            </div>
        </div>
    )
}

export default TestProcessing
