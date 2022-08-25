import { useState } from 'react'
import { Modal, Input, Row, Col, Form, Radio, Button } from 'antd'
import Table from 'antd/lib/table'

import moment from 'moment'

import AQAddModal from '../components/modals/aqaddmodal'
import { MyButton } from '../../../components'
import IndividualTable from './tables/IndividualTable'
import GroupTable from './tables/GroupTable'

import { useGetAttestationProtocolQuery } from '../../../services/AttestationProtocolService'

const AttestationProtocol = () => {
    //  const [modalNewQuali, setModalNewQuali] = useState(false)
    const onSearch = (value) => console.log(value)
    const [mode, setMode] = useState('INDIVIDUAL')
    const [type, setType] = useState('TEST')
    const { data, isLoading } = useGetAttestationProtocolQuery({ group_type: mode })
    const handleModeChange = (e) => {
        setMode(e.target.value)
    }
    const columns = [
        { title: '№', dataIndex: 'id', key: 'id' },
        { title: 'ФИО аттестуемого', dataIndex: 'user', key: 'user' },
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
                    : '',
        },
        {
            title: 'Дата формирования',
            dataIndex: 'created',
            key: 'created',
            render: (date) => moment(date).format('DD.MM.YYYY, hh:mm'),
        },
        {
            title: 'Действие',
            dataIndex: 'id',
            key: 'x',
            render: (id) => (
                <a href={data?.results[id]?.file} target="_blank" rel="noopener noreferrer">
                    <Button type="primary">Скачать</Button>
                </a>
            ),
        },
    ]
    console.log(data)
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
            <Table dataSource={data?.results} columns={columns} rowKey="id" />
            {/* <Row gutter={10} style={{ marginBottom: '10px' }}>
                <Col>
                    <MyButton onClick={() => setModalNewQuali(true)}>
                        Создать новую квалификацию
                    </MyButton>
                </Col>
                <Col>
                    <Search
                        size="large"
                        placeholder="Поиск..."
                        onSearch={onSearch}
                        enterButton
                        style={{ borderRadius: 4 }}
                    />
                </Col>
            </Row>
            <AQAddModal open={modalNewQuali} setOpen={setModalNewQuali} />
            <AttestationsQualificationsTable data={data} loading={isLoading} /> */}
        </div>
    )
}

export default AttestationProtocol