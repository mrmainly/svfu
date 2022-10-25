/* eslint-disable no-undef */
import React, { useEffect } from 'react'
import { Button, Spin } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import MainInfo from './components/MainInfo'
import SocialNetworks from './components/SocialNetworks'
import InfoScreen from './components/InfoScreen'
import { Line } from '../../components'
import ROUTES from '../../routes'
import { useGetProfileQuery } from '../../services/profile/Profile'
import { ProfileSlice } from '../../reducers/ProfileSlice'

import './profile.css'

const Profile = () => {
    const { data, isFetching } = useGetProfileQuery('')

    const { handleStatusPost } = ProfileSlice.actions

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (data?.post !== null) {
            dispatch(handleStatusPost('normal'))
        } else {
            dispatch(handleStatusPost('error'))
        }
    }, [data])

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
