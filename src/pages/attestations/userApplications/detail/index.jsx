import React, { useState } from 'react'

import { Radio, Typography, Button } from 'antd'

import { Line } from '../../../../components'
import QualificationTable from './components/tables/QualificationTable'
import DocumentsTable from './components/tables/DocumentsTable'
import Information from './components/Information'

const { Text } = Typography

const UserApplicationsDetail = () => {
    const [mode, setMode] = useState('info')

    const handleModeChange = (e) => {
        setMode(e.target.value)
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
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
                {mode === 'info' && <Information />}
                {mode === 'docs' && <DocumentsTable />}
                {mode === 'classification' && <QualificationTable />}
            </div>
        </div>
    )
}

export default UserApplicationsDetail
