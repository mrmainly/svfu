import React from "react";
import { Form, Button } from "antd";

import ProfileForm from "./components/ProfileForm";
import InfoForm from "./components/InfoForm";
import SocialForm from "./components/SocialForm";
import { Line } from "../../../components";

const ProfileDetail = () => {
    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div>
            <Form onFinish={onSubmit}>
                <ProfileForm />
                <Line />
                <SocialForm />
                <InfoForm />
                <Line />
                <Button
                    style={{
                        background: "#0D6EFD",
                        width: "100%",
                        borderRadius: 4,
                        width: "max-content",
                    }}
                    type="primary"
                    htmlType="submit"
                    size="large"
                >
                    Обновить
                </Button>
            </Form>
        </div>
    );
};

export default ProfileDetail;
