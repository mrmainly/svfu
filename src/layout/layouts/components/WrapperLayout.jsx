import React, { useState, useEffect } from 'react'

import { Layout, Menu, Divider, Drawer } from 'antd'
import cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'

import RolesDivisionMenuItem from '../../rolesDivisionMenuItem'
import Header from '../../../components/header'
import { useGetProfileQuery } from '../../../services/profile/Profile'
import ROUTES from '../../../routes'

const { Sider } = Layout

const LayoutWrapper = ({ children }) => {
    const [skip, setSkip] = useState(true)
    const [isToggled, setToggled] = useState(false)
    const { data } = useGetProfileQuery({ skip: skip })

    const onClose = () => {
        setToggled(false)
    }

    const navigate = useNavigate()

    const token = cookie.get('token')

    useEffect(() => {
        if (token === '' || token === undefined || token === null || !token) {
            setSkip(true)
        } else {
            setSkip(false)
        }
    }, [token])

    return (
        <>
            <Header setToggled={setToggled} isToggled={isToggled} data={data} />
            <Layout className="layout-main-block">
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
                        style={{
                            background: '#09304A',
                            color: 'white',
                            marginTop: 20,
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
                            RolesDivisionMenuItem(navigate),
                        ]}
                        theme="dark"
                    />
                    <Divider style={{ background: 'white' }} />
                </Drawer>
                {children}
            </Layout>
        </>
    )
}

LayoutWrapper.propTypes = {
    children: PropTypes.any,
}

export default LayoutWrapper
