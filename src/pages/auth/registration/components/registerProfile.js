import React from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useRegisterProfileVersionMutation } from "../../../../services/LoginService";
import { RegisterVersionSlice } from "../../../../reducers/RegisterVersionSlice";
import ROUTES from "../../../../routes";

const { Text } = Typography;

const RegisterProfile = () => {
    const [postRegisterProfile] = useRegisterProfileVersionMutation();
    const { handleOpenProfileVersion, handleOpenEmailVersion } =
        RegisterVersionSlice.actions;
    const { code } = useSelector((state) => state.register_verison_slice);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        if (data.password === data.password_verify) {
            delete data.password_verify;
            data.code = code;
            postRegisterProfile(data).then((res) => {
                if (res.data) {
                    dispatch(handleOpenProfileVersion(false));
                    dispatch(handleOpenEmailVersion(true));
                    navigate(ROUTES.LOGIN);
                } else {
                    message.error(res.error.data.errors[0]);
                }
                console.log(res);
            });
        } else {
            message.error("Пароль не подошел");
        }
    };

    return (
        <Form style={{ width: "100%" }} onFinish={onSubmit}>
            <Form.Item
                label={
                    <Text style={{ fontWeight: 600, fontSize: 16 }}>Логин</Text>
                }
                required
                rules={[
                    {
                        required: true,
                        message: "Пожалуйста введите логин",
                    },
                ]}
                name="username"
                labelCol={{ span: 24 }}
            >
                <Input placeholder="Введите логин" size="large" />
            </Form.Item>
            <Form.Item
                label={
                    <Text style={{ fontWeight: 600, fontSize: 16 }}>Имя</Text>
                }
                name="first_name"
                labelCol={{ span: 24 }}
            >
                <Input placeholder=" Введите имя" size="large" />
            </Form.Item>
            <Form.Item
                label={
                    <Text style={{ fontWeight: 600, fontSize: 16 }}>
                        Фамилия
                    </Text>
                }
                name="last_name"
                labelCol={{ span: 24 }}
            >
                <Input placeholder="Введите фамилия" size="large" />
            </Form.Item>
            <Form.Item
                label={
                    <Text style={{ fontWeight: 600, fontSize: 16 }}>
                        Отчество
                    </Text>
                }
                name="patronymic"
                labelCol={{ span: 24 }}
            >
                <Input placeholder="Введите отчество" size="large" />
            </Form.Item>
            <Form.Item
                label={
                    <Text style={{ fontWeight: 600, fontSize: 16 }}>
                        Номер телефона
                    </Text>
                }
                name="phone"
                labelCol={{ span: 24 }}
                required
                rules={[
                    {
                        required: true,
                        message: "Пожалуйста введите номер телефона",
                    },
                ]}
            >
                <Input placeholder="Дата рождения" size="large" />
            </Form.Item>
            <Form.Item
                label={
                    <Text style={{ fontWeight: 600, fontSize: 16 }}>
                        Введите дату рождения дд.мм.гггг
                    </Text>
                }
                name="birth_date"
                labelCol={{ span: 24 }}
            >
                <Input
                    placeholder="Введите вашу почту"
                    size="large"
                    type={"date"}
                />
            </Form.Item>
            <Form.Item
                label={
                    <Text style={{ fontWeight: 600, fontSize: 16 }}>
                        Пароль
                    </Text>
                }
                name="password"
                labelCol={{ span: 24 }}
                required
                rules={[
                    {
                        required: true,
                        message: "Пожалуйста введите пароль",
                    },
                ]}
            >
                <Input placeholder="Введите пароль" size="large" />
            </Form.Item>
            <Form.Item
                label={
                    <Text style={{ fontWeight: 600, fontSize: 16 }}>
                        Повторить пароль
                    </Text>
                }
                name="password_verify"
                labelCol={{ span: 24 }}
                required
                rules={[
                    {
                        required: true,
                        message: "Пожалуйста повторите пароль",
                    },
                ]}
            >
                <Input placeholder="Повторите пароль" size="large" />
            </Form.Item>
            <Button
                style={{
                    background: "#0D6EFD",
                    width: "100%",
                    borderRadius: 4,
                }}
                type="primary"
                htmlType="submit"
                size="large"
            >
                Далее
            </Button>
        </Form>
    );
};

export default RegisterProfile;
