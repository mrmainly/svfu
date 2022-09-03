import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'

import UserApplicationsTable from '../components/tables/UserApplicationsTable'
import { useGetApplicationQuery } from '../../../services/PaginationService'

const UserApplications = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const { data, isFetching } = useGetApplicationQuery({ currentPage: currentPage })
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])
    return (
        <div>
            <UserApplicationsTable data={data?.results} loading={isFetching} />
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
