import { useLocation } from 'react-router-dom'

import UsersTable from '../../users/components/tables/UsersTable'

import ROUTES from '../../../routes'

import { useGetAttestationUsersQuery } from '../../../services/AttestationProtocolService'

const LprUsers = () => {
    const { data, isLoading } = useGetAttestationUsersQuery()
    console.log(data)
    return (
        <div>
            <UsersTable data={data} isLoading={isLoading} />
        </div>
    )
}

export default LprUsers
