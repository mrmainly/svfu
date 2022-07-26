import { useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'

import { Radio, Button, message, Spin } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'

import { AttestedInfo } from './components/AttestedInfo'
import DocumentList from './documents/DocumentList'
import QualificationTable from './components/tables/QuailificationTable'
import UserChangeModal from './components/modals/UserChangeModal'
import { useGetAdminUserIdQuery, usePutUserMutation } from '../../../services/admin/AdminUsers'
import { rolesChoises } from '../../../constants'
import { Line } from '../../../components'
import '../admin-users.css'

const AdminUsersDetail = () => {
    const params = useParams()
    const { data, isFetching } = useGetAdminUserIdQuery({ id: params.id })
    const [putUser] = usePutUserMutation()
    const navigate = useNavigate()
    const [mode, setMode] = useState('info')
    const [open, setOpen] = useState(false)

    const handleModeChange = (e) => {
        setMode(e.target.value)
    }

    const handleChangeModalVision = () => {
        setOpen(true)
    }

    const profileData = [
        {
            name: 'ID',
            value: data?.id ? data?.id : '-',
        },
        {
            name: 'Логин',
            value: data?.username ? data?.username : '-',
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
        {
            name: 'Должность',
            value: data?.post ? data?.post : '-',
        },
    ]

    const lastName = data?.last_name ? data?.last_name + ' ' : ''

    const fisrtName = data?.first_name ? data?.first_name + ' ' : ''

    const patronymic = data?.patronymic ? data?.patronymic : ''

    if (isFetching) {
        return (
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
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: '20px',
                        lineHeight: '30px',
                    }}
                >
                    {rolesChoises[data?.role] + ' ' + lastName + fisrtName + patronymic}
                </span>
            </div>
            <Line />
            <div className="buttongroups">
                <Radio.Group onChange={handleModeChange} value={mode}>
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
                <Button
                    style={{ display: mode === 'info' ? 'block' : 'none' }}
                    onClick={handleChangeModalVision}
                >
                    Редактировать пользователя
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
            <UserChangeModal open={open} setOpen={setOpen} data={data} />
        </div>
    )
}

export default AdminUsersDetail
