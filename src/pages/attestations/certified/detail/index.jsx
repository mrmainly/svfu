import React, { useState } from 'react'

import { Radio, Typography } from 'antd'

// import QualificationTable from './components/tables/QualificationTable'
// import DocumentsTable from './components/tables/DocumentsTable'
import Information from './components/information'

const { Text } = Typography

const CertifiedDetail = () => {
    const [mode, setMode] = useState('info')

    const handleModeChange = (e) => {
        setMode(e.target.value)
    }

    return (
        <div>
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
                {/* {mode === 'docs' && <DocumentsTable />}
                {mode === 'classification' && <QualificationTable />} */}
            </div>
        </div>
    )
}

export default CertifiedDetail
