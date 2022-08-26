import React, { useState } from 'react'

import { Radio, Typography, Button, Spin, message } from 'antd'
import { useParams } from 'react-router-dom'

import { Line } from '../../../../components'
import QualificationTable from './components/tables/QualificationTable'
import DocumentsTable from './components/tables/DocumentsTable'
import Information from './components/Information'
import RejectModal from './components/modals/RejectModal'
import QualificationDetailModal from './components/modals/QualificationDetialModal'
import {
    useGetApplicationIdQuery,
    usePostAcceptApplicationMutation,
} from '../../../../services/TutorService'

const { Text } = Typography

const UserApplicationsDetail = () => {
    const [mode, setMode] = useState('info')
    const [open, setOpen] = useState(false)
    const [openRejectModal, setOpenRejectModal] = useState(false)
    const [qualificationData, setQualificationData] = useState([])

    const [postAcceptApplication] = usePostAcceptApplicationMutation()

    const params = useParams()

    const { data, isLoading } = useGetApplicationIdQuery(params.id)

    const handleModeChange = (e) => {
        setMode(e.target.value)
    }

    return (
        <>
            <RejectModal open={openRejectModal} setOpen={setOpenRejectModal} id={params.id} />
            <QualificationDetailModal open={open} setOpen={setOpen} data={qualificationData} />
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
                            <span style={{ color: '#2F80ED' }}> {data.direction.name}</span>
                        </Text>
                        <div style={{ display: 'flex' }}>
                            <Button
                                size="large"
                                type="primary"
                                onClick={() => {
                                    postAcceptApplication({ id: params.id }).then((res) => {
                                        if (res.data) {
                                            message.success('Вы приняли заявление ')
                                        } else {
                                            message.error(res.error.data.errors[0])
                                        }
                                    })
                                }}
                            >
                                Принять заявление
                            </Button>
                            <Button
                                size="large"
                                type="default"
                                style={{ marginLeft: 10, color: '#DC3545', borderColor: '#DC3545' }}
                                onClick={() => setOpenRejectModal(true)}
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
                        {mode === 'docs' && <DocumentsTable docs={data?.user.documents} />}
                        {mode === 'classification' && (
                            <QualificationTable
                                data={data?.user.qualification_improvement}
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

export default UserApplicationsDetail
