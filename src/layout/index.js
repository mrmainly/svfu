import React from "react";
import { Layout, Menu, Typography, Divider } from "antd";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { BsPersonFill, BsCardChecklist } from "react-icons/bs";
import { HiOutlineDocumentText } from "react-icons/hi";

import ROUTES from "../routes";
import MainLayout from "./layouts/MainLayout";
import SurveyLayout from "./layouts/SurveyLayout";

import "./layout.css";

const { Content, Sider } = Layout;
const { Title, Text } = Typography;

const MyLayout = () => {
    const navigate = useNavigate();
    const params = useLocation();

    const items = [
        {
            label: "Иванов Иван",
            key: "submenu-1",
            icon: <BsPersonFill />,
            children: [
                {
                    label: "Настройка профиля",
                    key: "submenu-item-1",
                    onClick: () => navigate(ROUTES.PROFILE),
                },
                {
                    label: "Выйти из системы",
                    key: "submenu-item-2",
                    onClick: () => {
                        localStorage.removeItem("jwttoken");
                        navigate(ROUTES.LOGIN);
                    },
                },
            ],
        },
        {
            label: "Тестирование",
            key: "submenu-2",
            icon: <BsCardChecklist />,
            children: [
                {
                    label: "Подача заявления",
                    key: "submenu-item-4",
                    onClick: () => navigate(ROUTES.APPILYNG),
                },
                {
                    label: "Доступные тесты",
                    key: "submenu-item-3",
                    onClick: () => navigate(ROUTES.AVAILABLE_TESTS),
                },
                {
                    label: "Итоги аттестации",
                    key: "submenu-item-7",
                    onClick: () => navigate(ROUTES.CERTIFICATION_RESULTS),
                },
            ],
        },
        {
            label: "Документы",
            key: "submenu-3",
            icon: <HiOutlineDocumentText />,
            children: [
                {
                    label: "Загрузить документы",
                    key: "submenu-item-5",
                    onClick: () => navigate(ROUTES.DOCUMENTS),
                },
                {
                    label: "Мои квалификации",
                    key: "submenu-item-6",
                    onClick: () => navigate(ROUTES.MY_QUALIFICATIONS),
                },
            ],
        },
    ];

    return (
        <>
            {params.pathname == "/" ||
            params.pathname == "/registration" ||
            params.pathname == "/forgot-password" ? (
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
                        style={{ background: "#09304A" }}
                    >
                        <Menu
                            mode="inline"
                            style={{ background: "#09304A", color: "white" }}
                            items={items}
                            theme="dark"
                        />
                        <Divider style={{ background: "white" }} />
                    </Sider>

                    {params.pathname === ROUTES.SURVEYS ? (
                        <SurveyLayout />
                    ) : (
                        <MainLayout params={params} />
                    )}
                </Layout>
            )}
        </>
    );
};

export default MyLayout;

{
    /* {items.map((item, index) => (
                                <Menu.Item
                                    key={index}
                                    onClick={() => navigate(item.navigate)}
                                >
                                    {item.label}
                                </Menu.Item>
                            ))}
                            <Menu.Item
                                onClick={() => {
                                    navigate(ROUTES.SIGN_IN);
                                }}
                            >
                                Выйти
                            </Menu.Item> */
}
