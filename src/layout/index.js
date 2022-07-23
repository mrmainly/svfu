import React from "react";
import { Layout, Menu, Typography, Divider } from "antd";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { BsPersonFill, BsCardChecklist } from "react-icons/bs";
import { HiOutlineDocumentText } from "react-icons/hi";

import "./layout.css";
import ROUTES from "../routes";
import { pathname } from "./pathname";

const { Header, Content, Sider } = Layout;
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
                    onClick: () => navigate(ROUTES.LOGIN),
                },
            ],
        },
        {
            label: "Тестирование",
            key: "submenu-2",
            icon: <BsCardChecklist />,
            children: [
                {
                    label: "Доступные тесты",
                    key: "submenu-item-3",
                    onClick: () => navigate(ROUTES.AVAILABLE_TESTS),
                },
                {
                    label: "Результаты тестов",
                    key: "submenu-item-4",
                    onClick: () => navigate(ROUTES.TEST_RESULTS),
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
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                marginTop: 10,
                                marginBottom: "-15px",
                                paddingLeft: 18,
                            }}
                        >
                            <img src="/img/image11.png" style={{ width: 56 }} />
                            <Title
                                style={{
                                    color: "white",
                                    marginLeft: 15,
                                    marginTop: 10,
                                }}
                                level={3}
                            >
                                САиЭС
                            </Title>
                        </div>
                        <Divider style={{ background: "white" }} />
                        <Menu
                            mode="inline"
                            style={{ background: "#09304A", color: "white" }}
                            items={items}
                            theme="dark"
                        />
                    </Sider>
                    <Layout>
                        <Content style={{ margin: "24px 24px 0" }}>
                            <div
                                className="site-layout-background"
                                style={{
                                    paddingLeft: 24,
                                    minHeight: 900,
                                    paddingTop: 16,
                                    paddingRight: 24,
                                }}
                            >
                                <div style={{ marginBottom: 16 }}>
                                    <Text style={{ fontSize: 20 }}>
                                        {pathname(params)}
                                    </Text>
                                    <div
                                        style={{
                                            background: "grey",
                                            height: 1,
                                            marginLeft: "-24px",
                                            marginRight: "-24px",
                                            marginTop: 16,
                                        }}
                                    ></div>
                                </div>
                                <Outlet />
                            </div>
                        </Content>
                    </Layout>
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
