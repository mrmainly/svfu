import { BsArrowLeft } from 'react-icons/bs'
import { Radio, Button, message } from 'antd'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ROUTES from '../../../routes'
import { AttestedInfo } from './components/AttestedInfo'
import DocumentList from './documents/DocumentList'
import QualificationTable from './components/tables/QuailificationTable'
import RoleChangeModal from './components/modals/RoleChangeModal'
import { useGetUserIdQuery, usePutUserMutation } from '../../../services/AdminService'

import moment from 'moment'
import { Line } from '../../../components'

const AdminUsersDetail = () => {
    const params = useParams()
    const { data, isLoading } = useGetUserIdQuery({ id: params.id })
    const [putUser] = usePutUserMutation()
    const navigate = useNavigate()
    const [mode, setMode] = useState('info')
    const [open, setOpen] = useState(false)
    const handleModeChange = (e) => {
        setMode(e.target.value)
    }

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
            value: data?.birth_date ? moment(data?.birth_date).format('DD.MM.YYYY, hh:mm') : '-',
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

    const role =
        data?.role === 'ADMIN'
            ? 'Администратор'
            : data?.role === 'MODERATOR'
            ? 'Модератор'
            : data?.role === 'EXPERT'
            ? 'Эксперт'
            : data?.role === 'TUTOR'
            ? 'Тьютор'
            : data?.role === 'CONSTRUCTOR'
            ? 'Менеджер оценочных средств'
            : data?.role === 'LPR'
            ? 'Лицо принимающее решение'
            : data?.role === 'TESTER'
            ? 'Аттестуемый'
            : ''

    const lastName = data?.last_name ? data?.last_name + ' ' : ''

    const fisrtName = data?.first_name ? data?.first_name + ' ' : ''

    const patronymic = data?.patronymic ? data?.patronymic : ''

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
                        navigate(ROUTES.ADMIN_USERS)
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
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '16px 0' }}>
                <Radio.Group onChange={handleModeChange} value={mode}>
                    <Radio.Button value="info">Информация</Radio.Button>
                    <Radio.Button value="docs">Документы</Radio.Button>
                    <Radio.Button value="classification">Квалификация</Radio.Button>
                </Radio.Group>
                <Button
                    style={{ display: mode === 'info' ? 'block' : 'none' }}
                    onClick={() => {
                        setOpen(true)
                    }}
                >
                    Изменить роль пользователя
                </Button>
            </div>
            {mode === 'info' && (
                <AttestedInfo profileData={profileData} bio={bio} contacts={contacts} />
            )}
            {mode === 'docs' && <DocumentList docs={data?.documents} />}
            {mode === 'classification' && (
                <QualificationTable qualifications={data?.qualification_improvement} />
            )}
            {mode === 'info' ? <Line /> : <></>}
            <div
                style={{
                    display: mode === 'info' ? 'block' : 'none',
                    padding: '12px 0',
                }}
            >
                <Button
                    ghost
                    type={data?.is_active ? 'danger' : 'primary'}
                    onClick={() => {
                        putUser({ id: params.id }).then((res) => {
                            if (res.data) {
                                message.success(
                                    data?.is_active
                                        ? 'Пользователь заблокирован'
                                        : 'Пользователь разблокирован'
                                )
                            } else {
                                message.error(res.error.data.errors[0])
                            }
                        })
                    }}
                >
                    {data?.is_active ? 'Заблокировать' : 'Разблокировать'}
                </Button>
            </div>
            <RoleChangeModal open={open} setOpen={setOpen} data={data?.role} />
        </div>
    )
}

export default AdminUsersDetail