import React, { useState, useEffect } from 'react'
import { Pagination, Input, Select } from 'antd'

import UserApplicationsTable from './components/tables/UserApplicationTable'
import { useGetTutorApplicationQuery } from '../../services/TutorService'
import './userApplication.css'

const UserApplications = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [ordering, setOrdering] = useState('')
    const [status, setStatus] = useState('')
    const [fullName, setFullName] = useState('')
    const [directionName, setDirectionName] = useState('')
    const [post, setPost] = useState('')
    const { data, isFetching } = useGetTutorApplicationQuery({
        currentPage: currentPage,
        ordering: ordering,
        status: status,
        fullName: fullName,
        directionName: directionName,
        post: post,
    })
    const statusSelect = [
        {
            text: '-',
            value: '',
        },
        {
            text: 'Принято',
            value: 'APPROVED',
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
            text: 'Завершен',
            value: 'FINISHED',
        },
        {
            text: 'Отменен',
            value: 'CANCELLED',
        },
    ]
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])
    return (
        <div>
            <div className="inputs-container">
                <Input.Search
                    placeholder="ФИО"
                    enterButton
                    onSearch={(value) => {
                        const currValue = value
                        setFullName(currValue)
                    }}
                    className="input-search"
                ></Input.Search>
                <Input.Search
                    placeholder="Квалификация"
                    enterButton
                    onSearch={(value) => {
                        const currValue = value
                        setDirectionName(currValue)
                    }}
                    className="input-search"
                ></Input.Search>
                <Input.Search
                    placeholder="Должность"
                    enterButton
                    onSearch={(value) => {
                        const currValue = value
                        setPost(currValue)
                    }}
                    className="input-search"
                ></Input.Search>
                <Select
                    placeholder="Статус"
                    className="input-search"
                    onChange={(value) => setStatus(value)}
                >
                    {statusSelect.map((item, index) => (
                        <Select.Option value={item.value} key={index}>
                            {item.text}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <UserApplicationsTable
                data={data?.results}
                loading={isFetching}
                setOrdering={setOrdering}
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

export default UserApplications
