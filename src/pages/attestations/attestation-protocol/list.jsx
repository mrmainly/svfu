import { useState } from 'react'
import { Modal, Input, Row, Col, Form } from 'antd'

import AttestationsQualificationsTable from '../components/tables/AttestationsQualificationsTable'
import AQAddModal from '../components/modals/aqaddmodal'
import { MyButton } from '../../../components'

import { useGetAttestationsQualificationQuery } from '../../../services/AttestationService'

const { Search } = Input

const AttestationProtocol = () => {
    const { data, isLoading } = useGetAttestationsQualificationQuery()
    const [modalNewQuali, setModalNewQuali] = useState(false)
    const onSearch = (value) => console.log(value)
    return (
        <div>
            AttestationProtocol
            {/* <Row gutter={10} style={{ marginBottom: '10px' }}>
                <Col>
                    <MyButton onClick={() => setModalNewQuali(true)}>
                        Создать новую квалификацию
                    </MyButton>
                </Col>
                <Col>
                    <Search
                        size="large"
                        placeholder="Поиск..."
                        onSearch={onSearch}
                        enterButton
                        style={{ borderRadius: 4 }}
                    />
                </Col>
            </Row>
            <AQAddModal open={modalNewQuali} setOpen={setModalNewQuali} />
            <AttestationsQualificationsTable data={data} loading={isLoading} /> */}
        </div>
    )
}

export default AttestationProtocol
