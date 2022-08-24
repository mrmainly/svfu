import { useState } from 'react'
import { Modal, Input, Row, Col, Form } from 'antd'

import TestProcessingTable from '../components/tables/TestProcessingTable'
import AQAddModal from '../components/modals/aqaddmodal'
import { MyButton } from '../../../components'

import { useGetTestProcessingQuery } from '../../../services/TestProcessingService'

const { Search } = Input

const TestProcessing = () => {
    const { data, isLoading } = useGetTestProcessingQuery()
    const onSearch = (value) => console.log(value)
    console.log(data?.results)
    return (
        <div>
            test processing
            <TestProcessingTable data={data?.results} loading={isLoading} />
        </div>
    )
}

export default TestProcessing
