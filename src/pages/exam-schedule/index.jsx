import React, { useState, useEffect } from 'react'
import { Pagination, Input, Select } from 'antd'

import ExamScheduleTable from './components/table'
import ESAddModal from './components/modals/ESAddModal'
import ESEditModal from './components/modals/ESEditModal'
import { useGetTutorExamQuery } from '../../services/TutorService'
import { MyButton } from '../../components'
import ViewSurveyModal from './components/modals/ViewSurveyModal'
import './exam-schedule.css'

const ExamSchedule = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [currentData, setCurrentData] = useState()
    const [unit, setUnit] = useState('')
    const [testGroup, setTestGroup] = useState('')
    const [testers, setTesters] = useState('')
    const [examStatus, setExamStatus] = useState('')
    const [ordering, setOrdering] = useState('')
    const { data, isFetching } = useGetTutorExamQuery({
        currentPage: currentPage,
        unit,
        testGroup,
        testers,
        examStatus,
        ordering,
    })
    const [modalEditES, setModalEditES] = useState(false)
    const [modalAddES, setModalAddES] = useState(false)
    const [currentSurveyId, setCurrentSurveyId] = useState()
    const [viewSurveyModalOpen, setViewSurveyModalOpen] = useState(false)

    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])
    const orderSelect = [
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
            <MyButton style={{ marginBottom: 20 }} onClick={() => setModalAddES(true)}>
                Назначить экзамен
            </MyButton>
            <ESAddModal open={modalAddES} setOpen={setModalAddES} />
            <ESEditModal open={modalEditES} setOpen={setModalEditES} dataList={currentData} />
            {viewSurveyModalOpen && (
                <ViewSurveyModal
                    open={viewSurveyModalOpen}
                    setOpen={setViewSurveyModalOpen}
                    currentSurveyId={currentSurveyId}
                />
            )}

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
                    placeholder="Аттестуемых"
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
                    <Select.Option value=""></Select.Option>
                    {orderSelect.map((item, index) => (
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
                    <Select.Option value="">Все статусы</Select.Option>
                    <Select.Option value="WAITING">Ожидание</Select.Option>
                    <Select.Option value="IN_PROGRESS">Идет тест</Select.Option>
                    <Select.Option value="COMPLETED">Завершен</Select.Option>
                    <Select.Option value="CANCELLED">Отменен</Select.Option>
                </Select>
            </div>
            <ExamScheduleTable
                data={data?.results}
                loading={isFetching}
                setCurrentSurveyId={setCurrentSurveyId}
                setOpenEditModal={setModalEditES}
                setCurrentData={setCurrentData}
                setViewSurveyModalOpen={setViewSurveyModalOpen}
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

export default ExamSchedule
