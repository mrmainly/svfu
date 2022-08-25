import React, { useState } from 'react'

import { Radio, Typography, Button, Spin } from 'antd'
import { useParams } from 'react-router-dom'

import { Line } from '../../../../components'
import QualificationTable from './components/tables/QualificationTable'
import DocumentsTable from './components/tables/DocumentsTable'
import Information from './components/Information'
import { useGetApplicationIdQuery } from '../../../../services/TutorService'

const { Text } = Typography

const UserApplicationsDetail = () => {
    const [mode, setMode] = useState('info')

    const params = useParams()

    const { data, isLoading } = useGetApplicationIdQuery(params.id)

    const handleModeChange = (e) => {
        setMode(e.target.value)
    }

    console.log(data)

    return (
        <>
            {isLoading ? (
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        paddingTop: 50,
                        paddingBottom: 50,
                    }}
                >
                    <Spin />
                </div>
            ) : (
                <div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <Text style={{ fontSize: 16 }}>
                            Заявление на квалификацию:
                            <span style={{ color: '#2F80ED' }}> Название_квалификации</span>
                        </Text>
                        <div style={{ display: 'flex' }}>
                            <Button size="large" type="primary">
                                Принять заявление
                            </Button>
                            <Button
                                size="large"
                                type="default"
                                style={{ marginLeft: 10, color: '#DC3545', borderColor: '#DC3545' }}
                            >
                                Отклонить
                            </Button>
                        </div>
                    </div>
                    <Line />
                    <Radio.Group
                        onChange={handleModeChange}
                        value={mode}
                        style={{
                            marginBottom: 8,
                        }}
                    >
                        <Radio.Button value="info">Информация</Radio.Button>
                        <Radio.Button value="docs">Документы</Radio.Button>
                        <Radio.Button value="classification">Квалификация</Radio.Button>
                    </Radio.Group>
                    <div style={{ marginTop: 15 }}>
                        {mode === 'info' && <Information data={data} />}
                        {mode === 'docs' && <DocumentsTable />}
                        {mode === 'classification' && <QualificationTable data={data.direction} />}
                    </div>
                </div>
            )}
        </>
    )
}

export default UserApplicationsDetail
