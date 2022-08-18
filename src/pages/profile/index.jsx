import React from 'react'
import { Button, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import cookie from 'js-cookie'
import { useTimer } from 'use-timer'

import MainInfo from './components/MainInfo'
import SocialNetworks from './components/SocialNetworks'
import InfoScreen from './components/InfoScreen'
import { Line } from '../../components'
import ROUTES from '../../routes'
import { useGetProfileQuery } from '../../services/ProfileService'

const Profile = () => {
    const { data, isFetching, error } = useGetProfileQuery({
        cookie: cookie.get('token'),
    })

    const navigate = useNavigate()
    const { time, start, pause, reset, status } = useTimer({
        initialTime: 3,
        timerType: 'DECREMENTAL',
        endTime: 0,
    })

    console.log(time)

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

    console.log(status)
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {time}
            <MainInfo data={data} />
            <Line />
            <SocialNetworks data={data} />
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
            <Button onClick={() => start()}>start</Button>
            <Button onClick={() => pause()}>end</Button>
        </div>
    )
}

export default Profile
