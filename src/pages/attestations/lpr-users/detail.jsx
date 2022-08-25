import { BsArrowLeft } from 'react-icons/bs'
import { Radio } from 'antd'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ROUTES from '../../../routes'
import { AttestedInfo } from './components/AttestedInfo'
import DocumentList from './documents/DocumentList'
import ClassificationTable from './components/tables/ClassificationTable'
import { useGetAttestationUserIdQuery } from '../../../services/AttestationProtocolService'

const LprUsersDetail = () => {
    const params = useParams()
    const { data, isLoading } = useGetAttestationUserIdQuery({ id: params.id })
    const navigate = useNavigate()
    const [mode, setMode] = useState('info')
    const handleModeChange = (e) => {
        setMode(e.target.value)
    }

    console.log(data)

    return (
        <div>
            <Radio.Group
                onChange={handleModeChange}
                value={mode}
                style={{
                    marginBottom: 8,
                }}
            >
                <Radio.Button value="info">Информация</Radio.Button>
                <Radio.Button value="docs">Документы</Radio.Button>
                <Radio.Button value="classification">Квалификация</Radio.Button>
            </Radio.Group>
            {/* {mode === 'info' && (
                <AttestedInfo profileData={profileData} bio={bio} contacts={contacts} />
            )}
            {mode === 'docs' && (
                <div>
                    <DocumentList docs={docs} />
                </div>
            )}
            {mode === 'classification' && (
                <div>
                    <ClassificationTable />
                </div>
            )} */}
        </div>
    )
}

export default LprUsersDetail
