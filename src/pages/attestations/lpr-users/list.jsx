import UsersTable from '../../users/components/tables/UsersTable'

import { useGetAttestationUsersQuery } from '../../../services/AttestationProtocolService'

const LprUsers = () => {
    const { data, isLoading } = useGetAttestationUsersQuery()

    return (
        <div>
            <UsersTable data={data} isLoading={isLoading} />
        </div>
    )
}

export default LprUsers
