import React from 'react'
import { Layout, Typography } from 'antd'
import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/exports'

import '../layout.css'
import { pathname } from '../pathname'

const { Content } = Layout
const { Text } = Typography

const MainLayout = ({ params }) => {
    const navigate = useNavigate()
    const { path, role, full_name, current_path } = useSelector((state) => state.dynamic_path_slice)
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
                        <Text style={{ fontSize: 20 }}>
                            {pathname(params, path, role, full_name, navigate, current_path)}
                        </Text>
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
