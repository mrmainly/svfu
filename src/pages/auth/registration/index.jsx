import React from "react";
import { Typography } from "antd";
import "./registration.css";
import { useSelector } from "react-redux";

import RegisterEmail from "./components/registerEmail";
import RegisterVerify from "./components/registerVerify";
import RegisterProfile from "./components/registerProfile";

const { Text } = Typography;

const Registration = () => {
    const { email, verify, profile } = useSelector(
        (state) => state.register_verison_slice
    );

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
                    {email && <RegisterEmail />}
                    {verify && <RegisterVerify />}
                    {profile && <RegisterProfile />}
                </div>
            </div>
        </div>
    );
};

export default Registration;
