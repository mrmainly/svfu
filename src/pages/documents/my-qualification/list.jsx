import { useState } from 'react'
import { Modal, Input, Row, Col, Form } from 'antd'

import MyQualificationTable from '../components/tables/MyQualificationTable'
import MQAddModal from '../components/modals/mqaddmodal'
import { useGetQualificationsQuery } from '../../../services/QualificationsService'
import { MyButton } from '../../../components'

const MyQualification = () => {
    const { data, isLoading } = useGetQualificationsQuery('')
    const [modalNewQualification, setModalNewQualification] = useState(false)

    return (
        <div>
            <MyButton style={{ marginBottom: 20 }} onClick={() => setModalNewQualification(true)}>
                Загрузить мою квалификацию
            </MyButton>
            <MQAddModal open={modalNewQualification} setOpen={setModalNewQualification} />
            <MyQualificationTable data={data} loading={isLoading} />
        </div>
    )
}

export default MyQualification
