import React from 'react'
import { Layout, Menu, Typography, Divider } from 'antd'
import { useNavigate, Outlet, useLocation } from 'react-router-dom'
import { BsPersonFill, BsCardChecklist, BsPeople } from 'react-icons/bs'
import { HiOutlineDocumentText } from 'react-icons/hi'

import ROUTES from '../routes'
import MainLayout from './layouts/MainLayout'
import SurveyLayout from './layouts/SurveyLayout'

import './layout.css'

const { Content, Sider } = Layout
const { Title, Text } = Typography

const MyLayout = () => {
    const navigate = useNavigate()
    const params = useLocation()

    const items = [
        {
            label: 'Тестирование',
            key: 'submenu-1',
            icon: <BsCardChecklist />,
            children: [
                {
                    label: 'Подача заявления',
                    key: 'submenu-item-1-1',
                    onClick: () => navigate(ROUTES.APPILYNG),
                },
                {
                    label: 'Доступные тесты',
                    key: 'submenu-item-1-2',
                    onClick: () => navigate(ROUTES.AVAILABLE_TESTS),
                },
                {
                    label: 'Итоги аттестации',
                    key: 'submenu-item-1-3',
                    onClick: () => navigate(ROUTES.CERTIFICATION_RESULTS),
                },
            ],
        },
        {
            label: 'Документы',
            key: 'submenu-2',
            icon: <HiOutlineDocumentText />,
            children: [
                {
                    label: 'Загрузить документы',
                    key: 'submenu-item-2-1',
                    onClick: () => navigate(ROUTES.DOCUMENTS),
                },
                {
                    label: 'Мои квалификации',
                    key: 'submenu-item-2-3',
                    onClick: () => navigate(ROUTES.MY_QUALIFICATIONS),
                },
            ],
        },
        {
            label: 'Пользователи',
            key: 'submenu-3',
            icon: <BsPeople />,
            children: [
                {
                    label: 'Пользователи',
                    key: 'submenu-item-3-1',
                    onClick: () => navigate(ROUTES.USERS),
                },
            ],
        },
        {
            label: 'Аттестация',
            key: 'submenu-4',
            icon: <BsPeople />,
            children: [
                {
                    label: 'Квалификация аттестаций',
                    key: 'submenu-item-4-1',
                    onClick: () => navigate(ROUTES.ATTESTATION_QUALI),
                },
                {
                    label: 'Банк тестирований',
                    key: 'submenu-item-4-2',
                    onClick: () => navigate(ROUTES.ATTESTATION_TESTS_BANK),
                },
            ],
        },
    ]

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
                            style={{ background: '#09304A', color: 'white', marginTop: 20 }}
                            items={items}
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
