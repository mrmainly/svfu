import React from 'react'
import { Layout, Menu, Divider } from 'antd'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { BsCardChecklist, BsPeople } from 'react-icons/bs'
import { HiOutlineDocumentText } from 'react-icons/hi'

import ROUTES from '../routes'
import MainLayout from './layouts/MainLayout'
import SurveyLayout from './layouts/SurveyLayout'
import RolesDivisionMenuItem from './rolesDivisionMenuItem'

import './layout.css'

const { Sider } = Layout

const MyLayout = () => {
    const navigate = useNavigate()
    const params = useLocation()

    console.log(localStorage.getItem('role'))

    return (
        <>
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
                        className="site-layout-background"
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
                    {params.pathname === ROUTES.THEORETICAL_PART ||
                    params.pathname === ROUTES.PRACTICAL_PART ? (
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
