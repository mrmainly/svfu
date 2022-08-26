import React from 'react'
import { Layout, Typography } from 'antd'
import { Outlet } from 'react-router-dom'

import '../layout.css'
import { pathname } from '../pathname'

const { Content } = Layout
const { Text } = Typography

const MainLayout = ({ params }) => {
    return (
        <Layout>
            <Content style={{ margin: '24px 24px 24px' }}>
                <div
                    className="site-layout-background"
                    style={{
                        paddingLeft: 24,
                        paddingTop: 16,
                        paddingRight: 24,
                        paddingBottom: 16,
                    }}
                >
                    <div style={{ marginBottom: 16 }}>
                        <Text style={{ fontSize: 20 }}>{pathname(params)}</Text>
                        <div
                            style={{
                                background: 'grey',
                                height: 1,
                                marginLeft: '-24px',
                                marginRight: '-24px',
                                marginTop: 16,
                            }}
                        ></div>
                    </div>
                    <Outlet />
                </div>
            </Content>
        </Layout>
    )
}

export default MainLayout
