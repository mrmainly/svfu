import React, { useState, useEffect } from 'react'
import { Pagination, Input } from 'antd'
import { useGetTesterDirectionQuery } from '../../services/TesterService'
import AppilyngTable from './components/table'
import './applying.css'
const Applying = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [ordering, setOrdering] = useState('')
    const [name, setName] = useState('')
    const { data, isFetching } = useGetTesterDirectionQuery({
        currentPage: currentPage,
        name: name,
        ordering: ordering,
    })
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])
    return (
        <div>
            <Input.Search
                placeholder="Квалификация"
                enterButton
                onSearch={(value) => {
                    const currValue = value
                    setName(currValue)
                }}
                className="input-search"
                style={{ marginBottom: 16 }}
            ></Input.Search>
            <AppilyngTable data={data?.results} loading={isFetching} setOrdering={setOrdering} />
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

export default Applying
