import { useState } from 'react'
import { Modal, Input, Row, Col, Form } from 'antd'

import AttestationsQualificationsTable from '../components/tables/AttestationsQualificationsTable'
import AQAddModal from '../components/modals/aqaddmodal'
import { MyButton } from '../../../components'

import { useGetAttestationsQualificationQuery } from '../../../services/AttestationService'

const { Search } = Input

const AttestationsQualifications = () => {
    const { data, isLoading } = useGetAttestationsQualificationQuery()
    const [modalNewQuali, setModalNewQuali] = useState(false)

    return (
        <div>
            <Row gutter={10} style={{ marginBottom: '10px' }}>
                <Col>
                    <MyButton onClick={() => setModalNewQuali(true)}>
                        Создать новую квалификацию
                    </MyButton>
                </Col>
                <Col>
                    <Search
                        size="large"
                        placeholder="Поиск..."
                        enterButton
                        style={{ borderRadius: 4 }}
                    />
                </Col>
            </Row>
            <AQAddModal open={modalNewQuali} setOpen={setModalNewQuali} />
            <AttestationsQualificationsTable data={data?.results} loading={isLoading} />
        </div>
    )
}

export default AttestationsQualifications
