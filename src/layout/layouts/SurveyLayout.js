import React from "react";
import { Layout, Typography } from "antd";
import { Outlet } from "react-router-dom";

import "../layout.css";
import { SurveysSideBar } from "../../components";

const { Content } = Layout;

const SurveyLayout = () => {
    return (
        <Layout>
            <Content
                style={{
                    margin: "24px 24px 24px",
                    display: "flex",
                    alignItems: "start",
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
                <SurveysSideBar />
            </Content>
        </Layout>
    );
};

export default SurveyLayout;
