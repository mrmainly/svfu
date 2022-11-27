import { useState, useEffect } from 'react'
import { Pagination, Select, Input, Button } from 'antd'

import QuestionsTable from './components/tables/QuestionsTable'
import SwitchQuestionModal from './components/modals/SwitchQuestionModal'
import { useGetConstructorQuestionQuery } from '../../../services/manager/question-bank'
import { useGetToolsDirectionQuery } from '../../../services/ToolsService'
import './managerQuestions.css'

const ManagerQuestionsPage = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [id, setId] = useState('')
    const [difficulty, setDifficulty] = useState('')
    const [is_active, setIs_active] = useState('')
    const [description, setDescription] = useState('')
    const [direction, setDirection] = useState('')
    // const [currentData, setCurrentData] = useState()
    const [modalEditQuestionsBank, setModalEditQuestionsBank] = useState(false)
    const { data, isFetching } = useGetConstructorQuestionQuery({
        currentPage: currentPage,
        id: id,
        difficulty: difficulty,
        is_active: is_active,
        description: description,
        direction: direction,
    })
    const { data: directionSelect } = useGetToolsDirectionQuery()
    const [showCreateQuestionModal, setShowCreateQuestionModal] = useState(false)
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])

    const handleOpenEditQuestionModal = () => {
        setModalEditQuestionsBank(!modalEditQuestionsBank)
    }

    return (
        <div>
            <Button style={{ marginBottom: 16 }} onClick={() => setShowCreateQuestionModal(true)}>
                Создать вопрос
            </Button>
            <SwitchQuestionModal
                open={showCreateQuestionModal}
                setOpen={setShowCreateQuestionModal}
            />
            <div className="inputs-container">
                <Input.Search
                    placeholder="Текст вопроса"
                    enterButton
                    onSearch={(value) => {
                        const currValue = value
                        setDescription(currValue)
                    }}
                    className="input-search"
                ></Input.Search>
                <Select
                    showSearch
                    className="input-search"
                    placeholder="Квалификация"
                    optionFilterProp="children"
                    filterOption={(input, option) => option.children.includes(input)}
                    filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                    onChange={(value) => setDirection(value)}
                >
                    <Select.Option value=""> Все квалификации</Select.Option>
                    {directionSelect?.map((item, index) => (
                        <Select.Option value={item.name} key={index}>
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
                <Select
                    placeholder="Статус"
                    className="input-search"
                    onChange={(value) => setIs_active(value)}
                >
                    <Select.Option value="">Все статусы</Select.Option>
                    <Select.Option value="true">Активна</Select.Option>
                    <Select.Option value="false">Не активна</Select.Option>
                </Select>
                <Select
                    placeholder="Сложность"
                    className="input-search"
                    onChange={(value) => setDifficulty(value)}
                >
                    <Select.Option value="">Все уровни сложности</Select.Option>
                    <Select.Option value="BEGINNER">Легкий</Select.Option>
                    <Select.Option value="ADVANCED">Средний</Select.Option>
                    <Select.Option value="EXPERT">Сложный</Select.Option>
                    <Select.Option value="DESCRIBE">Открытый</Select.Option>
                </Select>
            </div>
            {/* {modalEditQuestionsBank && (
                <QBEditModal
                    open={modalEditQuestionsBank}
                    setOpen={setModalEditQuestionsBank}
                    id={currentData?.id}
                />
            )} */}

            <QuestionsTable
                data={data?.results}
                loading={isFetching}
                setId={setId}
                handleOpenEditQuestionModal={handleOpenEditQuestionModal}
                // setCurrentData={setCurrentData}
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

export default ManagerQuestionsPage
