import { useState } from 'react'
import { Radio, Button, Pagination } from 'antd'
import Table from 'antd/lib/table'

import moment from 'moment'

import { useGetAttestationProtocolQuery } from '../../services/AttestationProtocolService'
import { useEffect } from 'react'

const AttestationProtocol = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(30)
    const [mode, setMode] = useState('INDIVIDUAL')
    const [type, setType] = useState('')
    const [id, setId] = useState('')
    const [secondColumn, setSecondColumn] = useState('user')
    const { data, isLoading } = useGetAttestationProtocolQuery({
        id: id,
        group_type: mode,
        currentPage: currentPage,
        type: type,
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
    const onTableChange = (newPagination, filters, sorter) => {
        if (filters?.type?.length > 0) {
            setType(filters?.type[0])
        } else {
            setType('')
        }
        if (sorter?.order === 'descend') {
            {
                setId('-id')
            }
        } else if (sorter?.order === 'ascend') {
            {
                setId('id')
            }
        } else {
            {
                setId('')
            }
        }
    }
    useEffect(() => {
        setTotalPage(data?.count)
    }, [data])
    const columns = [
        { title: '№', dataIndex: 'id', key: 'id', sorter: true },
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
            render: (type) =>
                type === 'TEST_RESULT'
                    ? 'Экзаменационный протокол'
                    : type === 'CERTIFICATION_RESULT'
                    ? 'Аттестационный протокол'
                    : '-',
            filterMultiple: false,
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
                onChange={onTableChange}
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
