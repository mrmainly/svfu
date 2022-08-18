import React from 'react'
import { Input } from 'antd'

import { useGetDirectionQuery } from '../../services/DirectionService'
import AppilyngTable from './components/tables/AppilyngTable'

const { Search } = Input

const Applying = () => {
    const { data, isLoading, error } = useGetDirectionQuery('')
    return (
        <div>
            <Search placeholder="Поиск..." enterButton style={{ width: 300, marginBottom: 20 }} />
            <AppilyngTable data={data} loading={isLoading} />
        </div>
    )
}

export default Applying
