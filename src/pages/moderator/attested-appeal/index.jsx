import React, { useState, useEffect } from 'react'
import AppealTable from './components/table'
import { Pagination, Input, Select } from 'antd'

import { useGetModeratorAppealQuery } from '../../../services/moderator/AttestedAppeal'
import './attested-appeal.css'

const AttestedAppeal = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [ordering, setOrdering] = useState('')
    const [direction, setDirection] = useState('')
    const [userId, setUserId] = useState('')
    const [status, setStatus] = useState('')
    const [score, setScore] = useState('')

    const { data, isLoading } = useGetModeratorAppealQuery({
        currentPage: currentPage,
        ordering: ordering,
        direction: direction,
        userId: userId,
        status: status,
        score: score,
    })
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
        console.log(data)
    }, [data])
    const statusSelect = [
        {
            text: '',
            value: '',
        },
        {
            text: 'Ожидает',
            value: 'WAITING',
        },
        {
            text: 'Принято',
            value: 'APPROVED',
        },
        {
            text: 'Отклонен',
            value: 'REJECTED',
        },
        {
            text: 'Завершен',
            value: 'FINISHED',
        },
        {
            text: 'Отменен',
            value: 'CANCELLED',
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
                    placeholder="ID аттесту-го"
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
                    onChange={(value) => setStatus(value)}
                >
                    {statusSelect?.map((item, index) => (
                        <Select.Option value={item.value} key={index}>
                            {item.text}
                        </Select.Option>
                    ))}
                </Select>
                <Input.Search
                    placeholder="Баллы"
                    enterButton
                    onSearch={(value) => {
                        const currValue = value
                        setScore(currValue)
                    }}
                    className="input-search"
                ></Input.Search>
            </div>
            <AppealTable data={data?.results} loading={isLoading} setOrdering={setOrdering} />
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

export default AttestedAppeal
