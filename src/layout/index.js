import React from "react";
import { Layout, Menu, Typography, Divider } from "antd";
import { useNavigate, Outlet, useLocation } from "react-router-dom";

import "./layout.css";
import ROUTES from "../routes";

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

const MyLayout = () => {
    const navigate = useNavigate();
    const params = useLocation();

    const pathname = () => {
        switch (params.pathname) {
            case "/orders":
                return "Заказы";
                break;
        }
    };

    const items = [
        {
            label: "Заказы",
            navigate: ROUTES.ORDERS,
        },
        {
            label: "Блог",
            navigate: ROUTES.BLOG,
        },
        {
            label: "Акции",
            navigate: ROUTES.STOCKS,
        },
        {
            label: "Аналитика",
            navigate: ROUTES.ANALYTICS,
        },
        {
            label: "Города",
            navigate: ROUTES.CITY,
        },
        {
            label: "Пользователи",
            navigate: ROUTES.USERS,
        },
        {
            label: "Вакансии",
            navigate: ROUTES.WORK,
        },
        // {
        //     label: "Теги",
        //     navigate: ROUTES.TAGS,
        // },
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
                        >
                            {items.map((item, index) => (
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
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Content style={{ margin: "16px 16px 0" }}>
                            <div
                                className="site-layout-background"
                                style={{ padding: 24, minHeight: 900 }}
                            >
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
