import React, { useState } from 'react'
import TestResultTable from '../components/tables/TestResultTable'
import { Pagination } from 'antd'

import { useGetTestResultQuery } from '../../../services/PaginationService'

const ModeratorTestResult = () => {
    const [currentPage, setCurrentPage] = useState(1)

    const { data, isLoading } = useGetTestResultQuery({ currentPage: currentPage })
    const onChange = (page) => {
        setCurrentPage(page)
    }
    console.log(currentPage)
    return (
        <div>
            <TestResultTable data={data?.results} loading={isLoading} />
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

export default ModeratorTestResult
