/* eslint-disable no-undef */
import React, { useState } from 'react'

import { Layout, Drawer, Button } from 'antd'
import { Outlet, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import '../layout.css'
import { SurveysSideBarExaminer, SurveysSideBarTester } from '../../components'
import { SurveysSlice } from '../../reducers/SurveysSlice'
import ROUTES from '../../routes'
import LayoutWrapper from './components/WrapperLayout'

const { Content } = Layout

const SurveyLayout = () => {
    const [drawerState, setDrawerState] = useState(true)
    const { mobileDrawer } = useSelector((state) => state.survey_slice)
    const { changeDrawerMobileOpen } = SurveysSlice.actions

    const params = useLocation()
    const dispatch = useDispatch()

    React.useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 760) {
                setDrawerState(true)
            }
            if (window.innerWidth > 760) {
                setDrawerState(false)
            }
        }
        handleResize()
        window.addEventListener('resize', handleResize)
    }, [])

    return (
        <LayoutWrapper>
            <Layout>
                <Content
                    style={{
                        margin: '24px 24px 24px',
                        display: 'flex',
                        alignItems: 'start',
                        flexDirection: drawerState ? 'column' : 'row',
                    }}
                >
                    {drawerState && (
                        <Button
                            style={{
                                width: '100%',
                                marginBottom: 16,
                                height: 40,
                                borderColor: '#0D6EFD',
                                color: '#0D6EFD',
                                fontSize: 20,
                                borderRadius: 5,
                            }}
                            onClick={() => dispatch(changeDrawerMobileOpen(true))}
                        >
                            Навигация по тесту
                        </Button>
                    )}
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
                    {params.pathname === ROUTES.TESTER_SURVEY_PART ? (
                        <div>
                            {drawerState ? (
                                <Drawer
                                    visible={mobileDrawer}
                                    onClose={() => dispatch(changeDrawerMobileOpen(false))}
                                    width={300}
                                >
                                    <SurveysSideBarTester />
                                </Drawer>
                            ) : (
                                <SurveysSideBarTester />
                            )}
                        </div>
                    ) : (
                        <div>
                            {drawerState ? (
                                <Drawer
                                    visible={mobileDrawer}
                                    onClose={() => dispatch(changeDrawerMobileOpen(false))}
                                    width={300}
                                >
                                    <SurveysSideBarExaminer />
                                </Drawer>
                            ) : (
                                <SurveysSideBarExaminer />
                            )}
                        </div>
                    )}
                </Content>
            </Layout>
        </LayoutWrapper>
    )
}

export default SurveyLayout
