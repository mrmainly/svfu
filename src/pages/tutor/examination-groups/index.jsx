import React, { useState, useEffect } from 'react'
import { Pagination, Input, Select } from 'antd'

import { MyButton } from '../../../components'
import ExaminationGroupsTable from './compoents/table'
import { useGetExaminationGroupsQuery } from '../../../services/tutor/ExaminationGroups'
import { useGetDirectionTuterQuery } from '../../../services/tutor/Tools'
import EgCreateModal from './compoents/modals/egCreateModal'
import EgEditModal from './compoents/modals/egEditModal'
import './examination-groups.css'
const ExaminationGroups = () => {
    const [open, setOpen] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [testGroup, setTestGroup] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [ordering, setOrdering] = useState('')
    const [examStatus, setExamStatus] = useState('')
    const [directionName, setDirectionName] = useState('')
    const { data, isFetching } = useGetExaminationGroupsQuery({
        currentPage: currentPage,
        ordering: ordering,
        examStatus: examStatus,
        directionName: directionName,
    })
    const { data: direction } = useGetDirectionTuterQuery('')
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])
    const selectStatus = [
        {
            text: 'Все статусы',
            value: '',
        },
        {
            text: 'Ожидание',
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
    return (
        <div>
            <EgCreateModal open={open} setOpen={setOpen} direction={direction?.results} />
            <EgEditModal
                open={openEditModal}
                setOpen={setOpenEditModal}
                direction={direction?.results}
                testGroup={testGroup}
            />
            <MyButton style={{ marginBottom: 20 }} onClick={() => setOpen(true)}>
                Создать группу
            </MyButton>
            <div className="inputs-container">
                <Input.Search
                    placeholder="Квалификация"
                    enterButton
                    onSearch={(value) => {
                        const currValue = value
                        setDirectionName(currValue)
                    }}
                    className="input-search"
                ></Input.Search>
                <Select
                    placeholder="Статус"
                    className="input-search"
                    onChange={(value) => setExamStatus(value)}
                >
                    {selectStatus?.map((item, index) => (
                        <Select.Option value={item.value} key={index}>
                            {item.text}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <ExaminationGroupsTable
                data={data?.results}
                loading={isFetching}
                setOpenEditModal={setOpenEditModal}
                setTestGroup={setTestGroup}
                setOrdering={setOrdering}
            />
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

export default ExaminationGroups
