import { useState, useEffect } from 'react'
import { Pagination, Input, Select } from 'antd'

import MyQualificationTable from '../components/tables/MyQualificationTable'
import MQAddModal from '../components/modals/mqaddmodal'
import { useGetQualificationsQuery } from '../../../services/documents/Qualifications'
import { MyButton } from '../../../components'
import './my-qualification.css'

const MyQualification = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [ordering, setOrdering] = useState('')
    const [name, setName] = useState('')
    const { data, isLoading } = useGetQualificationsQuery({
        currentPage: currentPage,
        ordering: ordering,
        name: name,
    })
    const [modalNewQualification, setModalNewQualification] = useState(false)

    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])
    const selectOrdering = [
        {
            text: '-',
            value: '',
        },
        {
            text: 'По номеру документа(возрастание)',
            value: 'id',
        },
        {
            text: 'По номеру документа(убывание)',
            value: '-id',
        },
        {
            text: 'По дате выдачи(возрастание)',
            value: 'date_of_issue',
        },
        {
            text: 'По дате выдачи(убывание)',
            value: '-date_of_issue',
        },
    ]
    console.log(data)
    return (
        <div>
            <MyButton style={{ marginBottom: 20 }} onClick={() => setModalNewQualification(true)}>
                Загрузить мою квалификацию
            </MyButton>
            <div className="inputs-container">
                <Input.Search
                    placeholder="Название квалификации"
                    enterButton
                    onSearch={(value) => {
                        const currValue = value
                        setName(currValue)
                    }}
                    className="input-search"
                ></Input.Search>
                <Select
                    placeholder="Сортировка"
                    className="input-search"
                    onChange={(value) => setOrdering(value)}
                >
                    {selectOrdering.map((item, index) => (
                        <Select.Option value={item.value} key={index}>
                            {item.text}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <MQAddModal open={modalNewQualification} setOpen={setModalNewQualification} />
            <MyQualificationTable data={data?.results} loading={isLoading} />
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

export default MyQualification
