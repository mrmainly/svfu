import React from 'react'
import { Layout, Typography } from 'antd'
import { Outlet } from 'react-router-dom'
import PropTypes from 'prop-types'

import '../layout.css'
import { pathname } from '../pathname'

const { Content } = Layout
const { Text } = Typography

const MainLayout = ({ params }) => {
    const path = pathname(params)
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
                    {path !== '' ? (
                        <div style={{ marginBottom: 16 }}>
                            <Text style={{ fontSize: 20 }}>{path}</Text>
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
                    ) : (
                        <></>
                    )}
                    <Outlet />
                </div>
            </Content>
        </Layout>
    )
}

MainLayout.propTypes = {
    params: PropTypes.any,
}

export default MainLayout
