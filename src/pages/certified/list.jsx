import React, { useState, useEffect } from 'react'
import { Pagination } from 'antd'

import CerifiedTable from './components/tables/CerifiedTable'
import { useGetTesterQuery } from '../../services/PaginationService'

const Certified = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const { data: tester, isLoading } = useGetTesterQuery({ currentPage: currentPage })
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(tester?.count)
    }, [tester])
    return (
        <div>
            <CerifiedTable data={tester?.results} loading={isLoading} />
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

export default Certified
