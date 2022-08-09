import React from "react";
import { Form, Button } from "antd";

import ProfileForm from "./components/ProfileForm";
import InfoForm from "./components/InfoForm";
import SocialForm from "./components/SocialForm";
import { Line, MyButton } from "../../../components";

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
                <MyButton htmlType="submit">Сохранить</MyButton>
            </Form>
        </div>
    );
};

export default ProfileDetail;
