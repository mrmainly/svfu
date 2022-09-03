import { useState } from 'react'
import { Modal, Input, Row, Col, Form, Radio, Button, Pagination } from 'antd'
import Table from 'antd/lib/table'

import moment from 'moment'

import AQAddModal from '../components/modals/aqaddmodal'
import { MyButton } from '../../../components'
import IndividualTable from './tables/IndividualTable'
import GroupTable from './tables/GroupTable'

import { useGetAttestationProtocolQuery } from '../../../services/AttestationProtocolService'
import { useEffect } from 'react'

const AttestationProtocol = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [mode, setMode] = useState('INDIVIDUAL')
    const [type, setType] = useState('TEST')
    const [secondColumn, setSecondColumn] = useState('user')
    const { data, isLoading } = useGetAttestationProtocolQuery({
        group_type: mode,
        currentPage: currentPage,
    })
    const handleModeChange = (e) => {
        setMode(e.target.value)
    }
    useEffect(() => {
        setSecondColumn(mode === 'INDIVIDUAL' ? 'user' : 'testgroup')
    }, [mode])
    const onChange = (page) => {
        setCurrentPage(page)
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])
    const columns = [
        { title: '№', dataIndex: 'id', key: 'id', render: (id) => (id ? id : '-') },
        {
            title: mode === 'INDIVIDUAL' ? 'ФИО аттестуемого' : 'Группа',
            dataIndex: secondColumn,
            key: secondColumn,
            render: (secondColumn) => (secondColumn ? secondColumn : '-'),
        },
        {
            title: 'Тип протокола',
            dataIndex: 'type',
            key: 'type',
            filters: [
                {
                    text: 'Экзаменационный протокол',
                    value: 'TEST_RESULT',
                },
                {
                    text: 'Аттестационный протокол',
                    value: 'CERTIFICATION_RESULT',
                },
            ],
            onFilter: (value, record) => record.type === value,
            render: (type) =>
                type === 'TEST_RESULT'
                    ? 'Экзаменационный протокол'
                    : type === 'CERTIFICATION_RESULT'
                    ? 'Аттестационный протокол'
                    : '-',
        },
        {
            title: 'Дата формирования',
            dataIndex: 'created',
            key: 'created',
            render: (date) => (date ? moment(date).format('DD.MM.YYYY, hh:mm') : '-'),
        },
        {
            title: 'Действие',
            dataIndex: 'file',
            key: 'file',
            render: (file) => (
                <a href={file} target="_blank" rel="noopener noreferrer">
                    <Button type="primary">Скачать</Button>
                </a>
            ),
        },
    ]
    return (
        <div>
            <Radio.Group
                onChange={handleModeChange}
                value={mode}
                style={{
                    marginBottom: 8,
                }}
            >
                <Radio.Button value="INDIVIDUAL">Индивидульные</Radio.Button>
                <Radio.Button value="GROUP">Групповые</Radio.Button>
            </Radio.Group>
            <Table
                dataSource={data?.results}
                columns={columns}
                rowKey="id"
                pagination={false}
                loading={isLoading}
            />
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

export default AttestationProtocol
