import TestResultTable from '../components/tables/TestResultTable'

import { useGetTestResultQuery } from '../../../services/ModeratorService'

const ModeratorTestResult = () => {
    const { data, isLoading } = useGetTestResultQuery()

    return (
        <div>
            <TestResultTable data={data?.results} loading={isLoading} />
        </div>
    )
}

export default ModeratorTestResult
