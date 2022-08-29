import { useState } from 'react'
import { Row, Col, Input } from 'antd'

import TBAddModal from '../components/modals/tbaddmodal'
import { useGetAttestationsTestsBankQuery } from '../../../services/AttestationService'

import TestsBankTable from '../components/tables/TestsBankTable'
import { MyButton } from '../../../components'
const { Search } = Input

const TestsBank = () => {
    const { data, isLoading } = useGetAttestationsTestsBankQuery()
    const [modalNewTest, setModalNewTest] = useState(false)
    const onSearch = (value) => console.log(value)
    return (
        <div>
            <Row gutter={10} style={{ marginBottom: '10px' }}>
                <Col>
                    <MyButton onClick={() => setModalNewTest(true)}>Создать новый тест</MyButton>
                </Col>
                {/* <Col>
                    <Search
                        size="large"
                        placeholder="Поиск..."
                        onSearch={onSearch}
                        enterButton
                        style={{ borderRadius: 4 }}
                    />
                </Col> */}
            </Row>
            <TBAddModal open={modalNewTest} setOpen={setModalNewTest} />
            <TestsBankTable data={data?.results} loading={isLoading} />
        </div>
    )
}

export default TestsBank
