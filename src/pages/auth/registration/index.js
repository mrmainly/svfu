import React from "react";
import { Typography, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./registration.css";

import ROUTES from "../../../routes";
import RegisterEmail from "./components/registerEmail";
import RegisterVerify from "./components/registerVerify";
import RegisterProfile from "./components/registerProfile";

const { Text } = Typography;

const Registration = () => {
    return (
        <div>
            {/* <div
                style={{
                    background: "url(/img/Frame1138.png)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    height: 40,
                    width: "100%",
                }}
            /> */}
            <div className="background_style">
                <div className="form">
                    <Text
                        style={{
                            fontWeight: 600,
                            fontSize: 18,
                            fontStyle: "normal",
                        }}
                    >
                        РЕГИСТРАЦИЯ
                    </Text>
                    {/* <RegisterEmail /> */}
                    {/* <RegisterVerify /> */}
                    <RegisterProfile />
                </div>
            </div>
        </div>
    );
};

export default Registration;
