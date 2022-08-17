import { BsArrowLeft } from 'react-icons/bs'
import { Radio } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ROUTES from '../../routes'
import { bio, contacts, profileData, docs } from './mock'
import { AttestedInfo } from './components/AttestedInfo'
import DocumentList from './documents/DocumentList'
import ClassificationTable from './components/tables/ClassificationTable'

const UsersDetail = () => {
    const navigate = useNavigate()
    const [mode, setMode] = useState('info')
    const handleModeChange = (e) => {
        setMode(e.target.value)
    }

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'start',
                    alignItems: 'center',
                    marginBottom: '10px',
                }}
            >
                <BsArrowLeft
                    style={{ fontSize: 30, cursor: 'pointer', marginRight: '10px' }}
                    onClick={() => {
                        navigate(ROUTES.USERS)
                    }}
                />
                <span
                    style={{
                        fontFamily: 'Roboto',
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: '20px',
                        lineHeight: '30px',
                    }}
                >
                    Пользователь Иванов Иван Иванович
                </span>
            </div>
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
            {mode === 'info' && (
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
            )}
        </div>
    )
}

export default UsersDetail
