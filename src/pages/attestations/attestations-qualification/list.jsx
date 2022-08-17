import { useState } from 'react'
import { Modal, Input, Row, Col, Form } from 'antd'

import AttestationsQualificationsTable from '../tables/AttestationsQualificationsTable'
import { MyButton } from '../../../components'
const { Search } = Input
const AttestationsQualifications = () => {
    const [modalNewQuali, setModalNewQuali] = useState(false)
    const onSearch = (value: string) => console.log(value)
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
                        onSearch={onSearch}
                        enterButton
                        style={{ borderRadius: 4 }}
                    />
                </Col>
            </Row>
            <Modal
                destroyOnClose={true}
                title="Создание квалификации"
                visible={modalNewQuali}
                onOk={() => setModalNewQuali(false)}
                onCancel={() => setModalNewQuali(false)}
                footer={[
                    <MyButton key="submit">Сохранить</MyButton>,
                    <MyButton
                        key="back"
                        type="default"
                        style={{
                            background: '#FFF',
                        }}
                        onClick={() => setModalNewQuali(false)}
                    >
                        Отмена
                    </MyButton>,
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="Название квалификации">
                        <Input></Input>
                    </Form.Item>
                </Form>
            </Modal>
            <AttestationsQualificationsTable />
        </div>
    )
}

export default AttestationsQualifications
