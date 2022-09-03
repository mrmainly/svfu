import React, { useState } from 'react'
import { Layout, Menu, Divider, Drawer } from 'antd'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'

import ROUTES from '../routes'
import MainLayout from './layouts/MainLayout'
import SurveyLayout from './layouts/SurveyLayout'
import RolesDivisionMenuItem from './rolesDivisionMenuItem'
import Header from '../components/header'

import './layout.css'

const { Sider } = Layout

const MyLayout = () => {
    const [isToggled, setToggled] = useState(false)

    const onClose = () => {
        setToggled(false)
    }

    const navigate = useNavigate()
    const params = useLocation()

    return (
        <>
            <Header setToggled={setToggled} isToggled={isToggled} />
            {params.pathname == '/' ||
            params.pathname == '/registration' ||
            params.pathname == '/forgot-password' ? (
                <div>
                    <Outlet />
                </div>
            ) : (
                <Layout style={{ minHeight: 950 }}>
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
                        bodyStyle={{ backgroundColor: '#001529', padding: '0' }}
                    >
                        <Menu
                            mode="inline"
                            items={RolesDivisionMenuItem(navigate)}
                            style={{ background: '#09304A', color: 'white', marginTop: 20 }}
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
