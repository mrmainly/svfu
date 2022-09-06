import React from 'react'

import { Divider, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import cookie from 'js-cookie'
import { Sling as Hamburger } from 'hamburger-react'

import './header.css'
import ROUTES from '../../routes'

const { Text } = Typography

const HeaderUser = ({ setToggled, isToggled, data }) => {
    const navigate = useNavigate()

    return (
        <div className="sticky-header-mobile">
            <div className="header-mobile">
                <div className="header-mobile-body">
                    <div style={{ marginRight: 15 }} onClick={() => setToggled(true)}>
                        <Hamburger color="#2371B9" toggled={isToggled} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            src="/img/image11.svg"
                            style={{ height: '52px', cursor: 'pointer', marginTop: 4 }}
                            onClick={() => navigate(ROUTES.PROFILE)}
                        />
                        <Text style={{ fontSize: 20, color: '#175680', fontFamily: 'Roboto' }}>
                            САиЭС
                        </Text>
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        width: '100%',
                    }}
                >
                    <img src="/img/mobilebackgrund.png" />
                </div>
            </div>
            <div
                style={{
                    background: 'url(./img/header_up.svg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundPositionX: 'center',
                }}
                className="header-desktop"
            >
                <img
                    src="/img/image11.svg"
                    style={{ height: '52px', cursor: 'pointer' }}
                    onClick={() => navigate(ROUTES.PROFILE)}
                />
                <div className="header-button-box">
                    <div
                        style={{
                            cursor: 'pointer',
                            padding: '5px 10px 5px 10px',
                            boxShadow: '0px -2px 23px 0px rgba(34, 60, 80, 0.2)',
                        }}
                        className="user-name-block"
                        onClick={() => navigate(ROUTES.PROFILE)}
                    >
                        {data?.last_name === null || data?.first_name === null ? (
                            <div>Ваш профиль</div>
                        ) : (
                            <div>
                                {data?.last_name} {data?.first_name}
                            </div>
                        )}
                    </div>
                    <Divider style={{ height: '16px' }} type="vertical" />
                    <div
                        className="user-button"
                        onClick={() => {
                            cookie.remove('token')
                            navigate(ROUTES.LOGIN)
                        }}
                    >
                        Выйти
                    </div>
                </div>
            </div>
            <div
                style={{
                    backgroundImage: 'url(./img/header_down.svg)',
                    backgroundRepeat: 'no-repeat',
                }}
                className="header-img-line"
            ></div>
        </div>
    )
}

export default HeaderUser
