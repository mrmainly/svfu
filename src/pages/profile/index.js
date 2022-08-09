import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

import MainInfo from "./components/MainInfo";
import SocialNetworks from "./components/SocialNetworks";
import InfoScreen from "./components/InfoScreen";
import { Line } from "../../components";
import ROUTES from "../../routes";

const Profile = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <MainInfo />
            <Line />
            <SocialNetworks />
            <InfoScreen />
            <Line />
            <Button
                style={{
                    background: "#0D6EFD",
                    borderRadius: 4,
                    width: "max-content",
                }}
                type="primary"
                htmlType="submit"
                size="large"
                onClick={() => navigate(ROUTES.PROFILE_EDITING)}
            >
                Редактировать профиль
            </Button>
        </div>
    );
};

export default Profile;
