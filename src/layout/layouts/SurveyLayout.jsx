import React from 'react'
import { Layout } from 'antd'
import { Outlet, useLocation } from 'react-router-dom'

import '../layout.css'
import { SurveysSideBar, SurveysSideBarTester } from '../../components'
import ROUTES from '../../routes'

const { Content } = Layout

const SurveyLayout = () => {
    const params = useLocation()

    console.log('asdasda')

    return (
        <Layout>
            <Content
                style={{
                    margin: '24px 24px 24px',
                    display: 'flex',
                    alignItems: 'start',
                }}
            >
                <div
                    className="site-layout-background"
                    style={{
                        paddingLeft: 24,
                        paddingTop: 16,
                        paddingRight: 24,
                        paddingBottom: 16,
                    }}
                >
                    <Outlet />
                </div>
                {params.pathname === ROUTES.THEORETICAL_PART ||
                params.pathname === ROUTES.PRACTICAL_PART ? (
                    <SurveysSideBarTester />
                ) : (
                    <SurveysSideBar />
                )}
            </Content>
        </Layout>
    )
}

export default SurveyLayout
