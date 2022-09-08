import React, { useState, useEffect } from 'react'
import AppealTable from './components/table'
import { Pagination } from 'antd'

import { useGetAppealQuery } from '../../services/PaginationService'

const AttestedAppeal = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)

    const { data, isLoading } = useGetAppealQuery({ currentPage: currentPage })
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])
    return (
        <div>
            <AppealTable data={data?.results} loading={isLoading} />
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

export default AttestedAppeal
