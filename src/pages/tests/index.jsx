import React, { useState, useEffect } from 'react'

import AvailableTestTable from './components/tables/AvailableTestTable'
import { useGetSurveysQuery } from '../../services/PaginationService'
import { Pagination } from 'antd'

const Test = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const { data, isLoading } = useGetSurveysQuery({ currentPage: currentPage })
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])
    return (
        <div>
            <AvailableTestTable data={data?.results} loading={isLoading} />
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

export default Test
