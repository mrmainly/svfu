import React from 'react'
import { Button, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import cookie from 'js-cookie'

import MainInfo from './components/MainInfo'
import SocialNetworks from './components/SocialNetworks'
import InfoScreen from './components/InfoScreen'
import { Line } from '../../components'
import ROUTES from '../../routes'
import { useGetProfileQuery } from '../../services/ProfileService'

const Profile = () => {
    const { data, isFetching, error } = useGetProfileQuery('')

    const navigate = useNavigate()

    if (isFetching) {
        return (
            <div
                style={{
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    paddingTop: 100,
                }}
            >
                <Spin />
            </div>
        )
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <MainInfo data={data} />
            <Line />
            <SocialNetworks data={data} />
            <Line />
            <InfoScreen data={data} />
            <Line />
            <Button
                style={{
                    background: '#0D6EFD',
                    borderRadius: 4,
                    width: 'max-content',
                }}
                type="primary"
                htmlType="submit"
                size="large"
                onClick={() => navigate(ROUTES.PROFILE_EDITING)}
            >
                Редактировать профиль
            </Button>
        </div>
    )
}

export default Profile
