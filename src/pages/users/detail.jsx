import { useState } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { BsArrowLeft } from 'react-icons/bs'

import { Radio, Spin } from 'antd'

import moment from 'moment'

import { AttestedInfo } from './components/AttestedInfo'
import DocumentList from './documents/DocumentList'
import QualificationTable from './components/tables/QuailificationTable'
import { Line } from '../../components'
import './users.css'

import { useGetLprUserIdQuery } from '../../services/lpr/LprUser'
import { useGetModeratorUserIdQuery } from '../../services/moderator/Surveys'

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

    const { data: lprUserData, isloading: lprIsLoading } = useGetLprUserIdQuery(
        {
            id: params.id,
        },
        { skip: type === 'LPR' ? false : true }
    )
    const { data: moderatorUserData, isloading: moderatorIsLoading } = useGetModeratorUserIdQuery(
        {
            id: params.id,
        },
        { skip: type === 'moderator' ? false : true }
    )

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
                    {lastName + fisrtName + patronymic}
                </span>
            </div>
            <Line />
            <Radio.Group
                onChange={handleModeChange}
                value={mode}
                style={{
                    margin: '16px 0',
                    width: '100%',
                }}
            >
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
