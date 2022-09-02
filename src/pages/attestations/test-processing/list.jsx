import React, { useState } from 'react'
import TestProcessingTable from '../components/tables/TestProcessingTable'
import { Pagination } from 'antd'

import { useGetTestProcessingQuery } from '../../../services/TestProcessingService'

const TestProcessing = () => {
    const [currentPage, setCurrentPage] = useState(1)

    const { data, isLoading } = useGetTestProcessingQuery({ currentPage: currentPage })

    const onChange = (page) => {
        setCurrentPage(page)
    }

    return (
        <div>
            <TestProcessingTable data={data?.results} loading={isLoading} />
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

export default TestProcessing
