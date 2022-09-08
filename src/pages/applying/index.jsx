import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'
import { useGetDirectionQuery } from '../../services/PaginationService'
import AppilyngTable from './components/table'

const Applying = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const { data, isLoading, refetch } = useGetDirectionQuery({ currentPage: currentPage })
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])
    return (
        <div>
            <AppilyngTable data={data?.results} loading={isLoading} refetchFunc={refetch} />
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

export default Applying
