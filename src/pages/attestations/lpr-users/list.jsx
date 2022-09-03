import React, { useState } from 'react'
import UsersTable from '../../users/components/tables/UsersTable'
import { Pagination } from 'antd'

import { useGetLprUserQuery } from '../../../services/PaginationService'

const LprUsers = () => {
    const [currentPage, setCurrentPage] = useState(1)

    const { data, isLoading } = useGetLprUserQuery({ currentPage: currentPage })

    const onChange = (page) => {
        setCurrentPage(page)
    }
    return (
        <div>
            <UsersTable data={data} isLoading={isLoading} />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Pagination
                    defaultCurrent={1}
                    total={data?.count}
                    pageSize={20}
                    style={{ marginTop: 20 }}
                    onChange={onChange}
                />
            </div>
        </div>
    )
}

export default LprUsers
