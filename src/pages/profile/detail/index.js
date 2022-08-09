import React from "react";
import { Form, Spin, message } from "antd";

import ProfileForm from "./components/ProfileForm";
import InfoForm from "./components/InfoForm";
import SocialForm from "./components/SocialForm";
import { Line, MyButton } from "../../../components";
import {
    useGetProfileQuery,
    useProfilePatchMutation,
} from "../../../services/ProfileService";

const ProfileDetail = () => {
    const { data, isFetching, error } = useGetProfileQuery("");
    const [patchProfile] = useProfilePatchMutation();

    const onSubmit = (data) => {
        patchProfile(data).then((res) => {
            if (res.data) {
                message.success("Профиль изменен");
            } else {
                message.error(
                    `${res.error.data.errors[0]} ${res.error.data.errors[1]}`
                );
            }
            console.log(res);
        });
        console.log(data);
    };

    return (
        <div>
            {isFetching ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        height: "100vh",
                        alignItems: "center",
                    }}
                >
                    <Spin />
                </div>
            ) : (
                <Form
                    onFinish={onSubmit}
                    initialValues={{
                        ["vk"]: data.vk,
                        ["first_name"]: data.first_name,
                        ["last_name"]: data.last_name,
                        ["patronymic"]: data.patronymic,
                        ["snils"]: data.snils,
                        ["inn"]: data.inn,
                        ["birth_date"]: data.birth_date,
                        ["email"]: data.email,
                        ["total_experience"]: data.total_experience,
                        ["youtube"]: data.youtube,
                        ["ok"]: data.ok,
                        ["my_biography"]: data.my_biography,
                        ["my_responsibilities"]: data.my_responsibilities,
                        ["participation_conferences"]:
                            data.participation_conferences,
                        ["rewards"]: data.rewards,
                        ["scientific_grants"]: data.scientific_grants,
                        ["scientific_interests"]: data.scientific_interests,
                        ["specialty_experience"]: data.specialty_experience,
                        ["ssa"]: data.ssa,
                        ["photo"]: data.photo,
                        ["phone"]: data.phone,
                        ["holding_conferences"]: data.holding_conferences,
                        ["honoured_title"]: data.honoured_title,
                    }}
                >
                    <ProfileForm />
                    <Line />
                    <SocialForm />
                    <InfoForm />
                    <Line />
                    <MyButton htmlType="submit">Сохранить</MyButton>
                </Form>
            )}
        </div>
    );
};

export default ProfileDetail;
