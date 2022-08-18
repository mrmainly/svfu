import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useGetQualificationsQuery } from '../../services/QualificationsService'
import { MyButton } from '../../components'
import ROUTES from '../../routes'
import QualificationsTable from './components/tables/QualificationsTable'

const Qualifications = () => {
    const navigate = useNavigate()
    const { data, isLoading } = useGetQualificationsQuery('')

    return (
        <div>
            <MyButton
                style={{ marginBottom: 20 }}
                onClick={() => navigate(ROUTES.QUALIFICATION_ADDED)}
            >
                Загрузить мою квалификацию
            </MyButton>
            <QualificationsTable
                data={data}
                routes={ROUTES.QUALIFICATION_DETAIL}
                loading={isLoading}
            />
        </div>
    )
}

export default Qualifications
