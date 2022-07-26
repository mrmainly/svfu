import React, { useState, useEffect } from 'react'
import { Pagination, Input } from 'antd'

import UsersTable from '../../users/components/tables/UsersTable'
import { useGetLprUserQuery } from '../../../services/lpr/LprUser'
import './lpr-users.css'

const LprUsers = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [role, setRole] = useState('')
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const { data, isLoading } = useGetLprUserQuery({
        name: name,
        id: id,
        role: role,
        currentPage: currentPage,
    })

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
                        setName(currValue)
                    }}
                    className="input-search"
                />
            </div>

            <UsersTable
                data={data}
                isLoading={isLoading}
                setRole={setRole}
                role={role}
                setId={setId}
                name={name}
                setName={setName}
            />
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

export default LprUsers
