import React, { useState, useEffect } from 'react'
import { Layout, Menu, Divider, Drawer } from 'antd'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import cookie from 'js-cookie'

import ROUTES from '../routes'
import MainLayout from './layouts/MainLayout'
import SurveyLayout from './layouts/SurveyLayout'
import RolesDivisionMenuItem from './rolesDivisionMenuItem'
import Header from '../components/header'

import './layout.css'

const { Sider } = Layout

const MyLayout = () => {
    const [isToggled, setToggled] = useState(false)
    const [data, setData] = useState([])

    const onClose = () => {
        setToggled(false)
    }

    const navigate = useNavigate()
    const params = useLocation()

    const token = cookie.get('token')

    useEffect(() => {
        if (token === '' || token === undefined || token === null || !token) {
            navigate(ROUTES.LOGIN)
        }
    }, [token])

    useEffect(() => {
        setData(JSON.parse(localStorage.getItem('profile')))
    }, [])

    return (
        <>
            <Header setToggled={setToggled} isToggled={isToggled} data={data} />
            {params.pathname == ROUTES.LOGIN ||
            params.pathname == ROUTES.REGISTRATION ||
            params.pathname == ROUTES.FORGOT_PASSWORD ? (
                <div>
                    <Outlet />
                </div>
            ) : (
                <Layout style={{ minHeight: 950, overflow: 'hidden' }}>
                    <Sider
                        width={250}
                        breakpoint="lg"
                        collapsedWidth="0"
                        className="hideOnDesktop"
                        style={{ background: '#09304A' }}
                    >
                        <Menu
                            mode="inline"
                            items={RolesDivisionMenuItem(navigate)}
                            style={{ background: '#09304A', color: 'white', marginTop: 20 }}
                            theme="dark"
                        />
                        <Divider style={{ background: 'white' }} />
                    </Sider>
                    <Drawer
                        placement="left"
                        onClose={onClose}
                        closable={false}
                        visible={isToggled}
                        className="hideOnMobile"
                        width={250}
                        bodyStyle={{ backgroundColor: '#09304A', padding: 0 }}
                    >
                        <Menu
                            mode="inline"
                            onClick={onClose}
                            inlineIndent={0}
                            style={{
                                background: '#09304A',
                                color: 'white',
                                marginTop: 20,
                                paddingLeft: 20,
                            }}
                            items={[
                                {
                                    label:
                                        data?.last_name === null || data?.first_name === null ? (
                                            <div>Ваш профиль</div>
                                        ) : (
                                            <div>
                                                {data?.last_name} {data?.first_name}
                                            </div>
                                        ),
                                    key: 'submenu-100',
                                    icon: <UserOutlined />,
                                    className: 'submenu-style',
                                    children: [
                                        {
                                            label: 'Настройка профиля',
                                            key: 'submenu-item-8-1',
                                            icon: <div>НП</div>,
                                            onClick: () => navigate(ROUTES.PROFILE),
                                            className: 'first',
                                        },
                                        {
                                            label: 'Выйти из системы',
                                            key: 'submenu-item-8-2',
                                            icon: <div>ВС</div>,
                                            className: 'first',
                                            onClick: () => {
                                                navigate(ROUTES.LOGIN)
                                                cookie.remove('token')
                                            },
                                        },
                                    ],
                                },
                                ...RolesDivisionMenuItem(navigate),
                            ]}
                            theme="dark"
                        />
                        <Divider style={{ background: 'white' }} />
                    </Drawer>
                    {params.pathname === ROUTES.TESTER_SURVEY_PART ||
                    params.pathname === ROUTES.SURVEYS_PART ? (
                        <SurveyLayout />
                    ) : (
                        <MainLayout params={params} />
                    )}
                </Layout>
            )}
        </>
    )
}

export default MyLayout
