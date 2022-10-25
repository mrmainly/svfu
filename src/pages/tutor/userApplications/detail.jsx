import React, { useState } from 'react'

import { BsArrowLeft } from 'react-icons/bs'
import { Radio, Typography, Button, Spin, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'

import ROUTES from '../../../routes'
import { Line } from '../../../components'
import QualificationTable from './components/tables/QualificationTable'
import DocumentsTable from './components/tables/DocumentsTable'
import Information from './components/Information'
import RejectModal from './components/modals/RejectModal'
import QualificationDetailModal from './components/modals/QualificationDetialModal'
import {
    useGetUserApplicationIdQuery,
    usePostAcceptUserApplicationMutation,
} from '../../../services/tutor/UserApplication'
import { rolesChoises } from '../../../constants'

const { Text } = Typography

const UserApplicationsDetail = () => {
    const [mode, setMode] = useState('info')
    const [open, setOpen] = useState(false)
    const [openRejectModal, setOpenRejectModal] = useState(false)
    const [qualificationData, setQualificationData] = useState([])

    const [postAcceptApplication] = usePostAcceptUserApplicationMutation()

    const params = useParams()
    const navigate = useNavigate()

    const { data, isLoading } = useGetUserApplicationIdQuery(params.id)

    const role = rolesChoises[data?.user.role]

    const lastName = data?.user.last_name ? data?.user.last_name + ' ' : ''

    const fisrtName = data?.user.first_name ? data?.user.first_name + ' ' : ''

    const patronymic = data?.user.patronymic ? data?.user.patronymic : ''

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
                        paddingTop: 100,
                        height: 800,
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
                                navigate(ROUTES.USER_APPLICATIONS)
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
                            {role + ' ' + lastName + fisrtName + patronymic}
                        </span>
                    </div>
                    <Line />
                    <div className="statement_box">
                        <Text style={{ fontSize: 16 }}>
                            Заявление на квалификацию:
                            <span style={{ color: '#2F80ED' }}> {data.direction.name}</span>
                        </Text>
                        {data.status === 'WAITING' ? (
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
                                    style={{
                                        marginLeft: 10,
                                        color: '#DC3545',
                                        borderColor: '#DC3545',
                                    }}
                                    onClick={() => setOpenRejectModal(true)}
                                >
                                    Отклонить
                                </Button>
                            </div>
                        ) : (
                            <Text
                                style={{
                                    color:
                                        data.status === 'APPROVED'
                                            ? '#2F80ED'
                                            : data.status === 'REJECTED'
                                            ? '#FE5860'
                                            : '#828282',
                                    fontFamily: 'Roboto',
                                    fontWeight: 400,
                                    fontSize: '16px',
                                    lineHeight: '24px',
                                }}
                            >
                                {data.status === 'APPROVED'
                                    ? 'Заявление принято'
                                    : data.status === 'REJECTED'
                                    ? 'Заявление отклонено'
                                    : data.status === 'FINISHED'
                                    ? 'Завершено'
                                    : data.status === 'CANCELLED'
                                    ? 'Отменено'
                                    : ''}
                            </Text>
                        )}
                    </div>
                    <Line />
                    <Radio.Group onChange={handleModeChange} value={mode} style={{ width: '100%' }}>
                        <Radio.Button value="info" className="buttongroups_buttonItem">
                            Информация
                        </Radio.Button>
                        <Radio.Button value="docs" className="buttongroups_buttonItem">
                            Документы
                        </Radio.Button>
                        <Radio.Button value="classification" className="buttongroups_buttonItem">
                            Квалификация
                        </Radio.Button>
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
