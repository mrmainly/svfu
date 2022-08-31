import AppealTable from './components/table'

import { useGetAppealQuery } from '../../../services/ModeratorService'

const AttestedAppeal = () => {
    const { data, isLoading } = useGetAppealQuery()

    return (
        <div>
            <AppealTable data={data?.results} loading={isLoading} />
        </div>
    )
}

export default AttestedAppeal
