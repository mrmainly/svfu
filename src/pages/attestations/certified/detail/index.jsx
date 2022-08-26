import React, { useState } from 'react'

import { Radio, Typography, Spin } from 'antd'
import { useParams } from 'react-router-dom'

import QualificationTable from './components/tables/QualificationTable'
import DocumentsTable from './components/tables/DocumentsTable'
import Information from './components/information'
import { useGetCertifiedIdQuery } from '../../../../services/TutorService'
import QualificationModal from './components/modals/QualificationModal'

const { Text } = Typography

const CertifiedDetail = () => {
    const params = useParams()

    const [open, setOpen] = useState(false)
    const [qualificationData, setQualificationData] = useState([])
    const [mode, setMode] = useState('info')
    const { data, isLoading } = useGetCertifiedIdQuery({ id: params.id })

    const handleModeChange = (e) => {
        setMode(e.target.value)
    }

    return (
        <>
            <QualificationModal open={open} setOpen={setOpen} data={qualificationData} />
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
                        {mode === 'docs' && <DocumentsTable docs={data?.documents} />}
                        {mode === 'classification' && (
                            <QualificationTable
                                data={data.qualification_improvement}
                                setOpen={setOpen}
                                setQualificationData={setQualificationData}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    )
}

export default CertifiedDetail
