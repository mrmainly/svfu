import TestProcessingTable from '../components/tables/TestProcessingTable'

import { useGetTestProcessingQuery } from '../../../services/TestProcessingService'

const TestProcessing = () => {
    const { data, isLoading } = useGetTestProcessingQuery()

    return (
        <div>
            <TestProcessingTable data={data?.results} loading={isLoading} />
        </div>
    )
}

export default TestProcessing
