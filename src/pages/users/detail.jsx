import { useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

import { Radio, Spin } from 'antd'

import moment from 'moment'

import { AttestedInfo } from './components/AttestedInfo'
import DocumentList from './documents/DocumentList'
import QualificationTable from './components/tables/QuailificationTable'
import { Line } from '../../components'
import { roles } from '../../translation/RolesTranslation'

import { useGetAttestationUserIdQuery } from '../../services/AttestationProtocolService'
import { useGetModeratorUserIdQuery } from '../../services/ModeratorService'

const UsersDetail = () => {
    const params = useParams()
    const location = useLocation()
    const navigate = useNavigate()
    const [mode, setMode] = useState('info')
    const handleModeChange = (e) => {
        setMode(e.target.value)
    }

    const state = location.state
    const { type } = state

    const { data: lprUserData, isloading: lprIsLoading } = useGetAttestationUserIdQuery({
        id: params.id,
    })
    const { data: moderatorUserData, isloading: moderatorIsLoading } = useGetModeratorUserIdQuery({
        id: params.id,
    })

    //  const data =
    //      type === 'LPR'
    //          ? useGetAttestationUserIdQuery({
    //                id: params.id,
    //            })
    //          : useGetModeratorUserIdQuery({
    //                id: params.id,
    //            })

    const data =
        type === 'LPR'
            ? !lprIsLoading
                ? lprUserData
                : ''
            : !moderatorIsLoading
            ? moderatorUserData?.user
            : ''
    const isLoading =
        type === 'LPR' ? lprIsLoading : type === 'moderator' ? moderatorIsLoading : true

    const profileData = [
        {
            name: 'ID',
            value: data?.id ? data?.id : '-',
        },
        {
            name: 'Фамилия',
            value: data?.last_name ? data?.last_name : '-',
        },
        {
            name: 'Имя',
            value: data?.first_name ? data?.first_name : '-',
        },
        {
            name: 'Отчество',
            value: data?.patronymic ? data?.patronymic : '-',
        },
        {
            name: 'Должность',
            value: data?.post ? data?.post : '-',
        },
        {
            name: 'Дата рождения',
            value: data?.birth_date ? moment(data?.birth_date).format('DD.MM.YYYY') : '-',
        },
        {
            name: 'Электронная почта',
            value: data?.email ? data?.email : '-',
        },
        {
            name: 'Телефон',
            value: data?.phone ? data?.phone : '-',
        },
        {
            name: 'ИНН',
            value: data?.inn ? data?.inn : '-',
        },
        {
            name: 'СНИЛС',
            value: data?.snils ? data?.snils : '-',
        },
    ]

    const contacts = [
        {
            name: 'VK',
            value: data?.vk ? data?.vk : '-',
        },
        {
            name: 'Одноклассники',
            value: data?.ok ? data?.ok : '-',
        },
        {
            name: 'Youtube',
            value: data?.youtube ? data?.youtube : '-',
        },
    ]

    const bio = [
        {
            name: 'Биография',
            value: data?.my_biography ? data?.my_biography : '-',
        },
        {
            name: 'Мои обязанности',
            value: data?.my_responsibilities ? data?.my_responsibilities : '-',
        },
        {
            name: 'Достижения и поощрения',
            value: data?.rewards ? data?.rewards : '-',
        },
        {
            name: 'Научные интересы',
            value: data?.scientific_interests ? data?.scientific_interests : '-',
        },
        {
            name: 'Научные гранты',
            value: data?.scientific_grants ? data?.scientific_grants : '-',
        },
        {
            name: 'Проведение конференций',
            value: data?.holding_conferences ? data?.holding_conferences : '-',
        },
        {
            name: 'Участие в конференциях, симпозиумах',
            value: data?.participation_conferences ? data?.participation_conferences : '-',
        },
        {
            name: 'Почетные звания',
            value: data?.honoured_title ? data?.honoured_title : '-',
        },
        {
            name: 'Научно-общественная деятельность',
            value: data?.ssa ? data?.ssa : '-',
        },
        {
            name: 'Общий стаж работы',
            value: data?.total_experience ? data?.total_experience : '-',
        },
        {
            name: 'Стаж работы по специальности',
            value: data?.specialty_experience ? data?.specialty_experience : '-',
        },
    ]

    const lastName = data?.last_name ? data?.last_name + ' ' : ''

    const fisrtName = data?.first_name ? data?.first_name + ' ' : ''

    const patronymic = data?.patronymic ? data?.patronymic : ''

    if (isLoading) {
        return (
            <div
                style={{
                    height: 190,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Spin />
            </div>
        )
    }

    return (
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
                    margin: '16px 0',
                }}
            >
                <Radio.Button value="info">Информация</Radio.Button>
                <Radio.Button value="docs">Документы</Radio.Button>
                <Radio.Button value="classification">Квалификация</Radio.Button>
            </Radio.Group>
            {mode === 'info' && (
                <AttestedInfo profileData={profileData} bio={bio} contacts={contacts} />
            )}
            {mode === 'docs' && <DocumentList docs={data?.documents} />}
            {mode === 'classification' && (
                <QualificationTable qualifications={data?.qualification_improvement} />
            )}
        </div>
    )
}

export default UsersDetail
