import React, { useState, useEffect } from 'react'
import { Pagination, Input } from 'antd'

import CerifiedTable from './components/tables/CerifiedTable'
import { useGetTutorTesterQuery } from '../../../services/TutorService'
import './certified.css'

const Certified = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [ordering, setOrdering] = useState('')
    const [fullName, setFullName] = useState('')
    const [application, setApplication] = useState('')
    const { data: tester, isLoading } = useGetTutorTesterQuery({
        currentPage: currentPage,
        ordering: ordering,
        fullName: fullName,
        application: application,
    })
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(tester?.count)
    }, [tester])
    return (
        <div>
            <div className="inputs-container">
                <Input.Search
                    placeholder="ФИО"
                    enterButton
                    onSearch={(value) => {
                        const currValue = value
                        setFullName(currValue)
                    }}
                    className="input-search"
                ></Input.Search>
                <Input.Search
                    placeholder="Квалификация"
                    enterButton
                    onSearch={(value) => {
                        const currValue = value
                        setApplication(currValue)
                    }}
                    className="input-search"
                ></Input.Search>
            </div>
            <CerifiedTable data={tester?.results} loading={isLoading} setOrdering={setOrdering} />
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

export default Certified
