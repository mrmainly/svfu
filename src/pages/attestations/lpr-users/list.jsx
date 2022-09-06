import React, { useState, useEffect } from 'react'
import UsersTable from '../../users/components/tables/UsersTable'
import { Pagination } from 'antd'

import { useGetAttestationUsersQuery } from '../../../services/AttestationProtocolService'

const LprUsers = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [role, setRole] = useState('')
    const [id, setId] = useState('')
    const [name, setName] = useState('')
    const { data, isLoading } = useGetAttestationUsersQuery({
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
                />
            </div>
        </div>
    )
}

export default LprUsers
