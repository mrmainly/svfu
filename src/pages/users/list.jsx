import { useLocation } from 'react-router-dom'

import UsersTable from './components/tables/UsersTable'

const UsersList = () => {
    const location = useLocation()

    const state = location.state

    const { data } = state
    return (
        <div>
            <UsersTable data={data} />
        </div>
    )
}

export default UsersList
