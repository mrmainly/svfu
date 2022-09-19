import React, { useState, useEffect } from 'react'
import { Pagination, Input, Select } from 'antd'

import { useGetAdminExamQuery } from '../../../services/AdminService'
import AdminExamModal from './modal'
import AdminExamTable from './table'
import './admin-exam.css'

const AdminExam = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [unit, setUnit] = useState('')
    const [testGroup, setTestGroup] = useState('')
    const [testers, setTesters] = useState('')
    const [examStatus, setExamStatus] = useState('')
    const [ordering, setOrdering] = useState('')

    const [open, setOpen] = React.useState(false)
    const [modalData, setModalData] = React.useState()

    const { data, isFetching } = useGetAdminExamQuery({
        currentPage: currentPage,
        unit: unit,
        testGroup: testGroup,
        testers: testers,
        examStatus: examStatus,
        ordering: ordering,
    })

    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])
    const statusSelect = [
        {
            text: '',
            value: '',
        },
        {
            text: 'Ожидает',
            value: 'WAITING',
        },
        {
            text: 'Идет тест',
            value: 'IN_PROGRESS',
        },
        {
            text: 'Завершен',
            value: 'COMPLETED',
        },
        {
            text: 'Отменен',
            value: 'CANCELLED',
        },
    ]
    const orderSelect = [
        {
            text: '',
            value: '',
        },
        {
            text: 'По номеру (возрастание)',
            value: 'id',
        },
        {
            text: 'По номеру (убывание)',
            value: '-id',
        },
        {
            text: 'Начало (возрастание)',
            value: 'date_start',
        },
        {
            text: 'Начало (убывание)',
            value: '-date_start',
        },
        {
            text: 'Конец (возрастание)',
            value: 'date_finish',
        },
        {
            text: 'Конец (убывание)',
            value: '-date_finish',
        },
    ]
    return (
        <div>
            <div className="inputs-container">
                <Input.Search
                    placeholder="Тестирование"
                    enterButton
                    onSearch={(value) => {
                        const currValue = value
                        setUnit(currValue)
                    }}
                    className="input-search"
                ></Input.Search>
                <Input.Search
                    placeholder="Группа"
                    enterButton
                    onSearch={(value) => {
                        const currValue = value
                        setTestGroup(currValue)
                    }}
                    className="input-search"
                ></Input.Search>
                <Input.Search
                    placeholder="Аттес-ых"
                    enterButton
                    onSearch={(value) => {
                        const currValue = value
                        setTesters(currValue)
                    }}
                    className="input-search"
                ></Input.Search>
                <Select
                    placeholder="Сортировка"
                    className="input-search"
                    onChange={(value) => setOrdering(value)}
                >
                    {orderSelect?.map((item, index) => (
                        <Select.Option value={item.value} key={index}>
                            {item.text}
                        </Select.Option>
                    ))}
                </Select>
                <Select
                    placeholder="Статус"
                    className="input-search"
                    onChange={(value) => setExamStatus(value)}
                >
                    {statusSelect?.map((item, index) => (
                        <Select.Option value={item.value} key={index}>
                            {item.text}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <AdminExamTable
                data={data}
                loading={isFetching}
                setModalData={setModalData}
                setOpen={setOpen}
                setOrdering={setOrdering}
            />
            {open && <AdminExamModal open={open} setOpen={setOpen} dataList={modalData} />}
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

export default AdminExam
