import React, { useState } from 'react'

import { Radio, Spin } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'

import { BsArrowLeft } from 'react-icons/bs'

import QualificationTable from './components/tables/QualificationTable'
import DocumentsTable from './components/tables/DocumentsTable'
import Information from './components/information'
import { useGetCertifiedIdQuery } from '../../services/TutorService'
import QualificationModal from './components/modals/QualificationModal'
import { roles } from '../../translation/RolesTranslation'
import { Line } from '../../components'

const CertifiedDetail = () => {
    const params = useParams()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false)
    const [qualificationData, setQualificationData] = useState([])
    const [mode, setMode] = useState('info')
    const { data, isLoading } = useGetCertifiedIdQuery({ id: params.id })
    const handleModeChange = (e) => {
        setMode(e.target.value)
    }

    const lastName = data?.last_name ? data?.last_name + ' ' : ''

    const fisrtName = data?.first_name ? data?.first_name + ' ' : ''

    const patronymic = data?.patronymic ? data?.patronymic : ''

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
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'start',
                            alignItems: 'center',
                            marginBottom: '10px',
                        }}
                    >
                        <BsArrowLeft
                            style={{ fontSize: 30, cursor: 'pointer', marginRight: '10px' }}
                            onClick={() => {
                                navigate(-1)
                            }}
                        />
                        <span
                            style={{
                                fontFamily: 'Roboto',
                                fontStyle: 'normal',
                                fontWeight: '400',
                                fontSize: '20px',
                                lineHeight: '30px',
                            }}
                        >
                            {roles(data?.role) + ' ' + lastName + fisrtName + patronymic}
                        </span>
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
