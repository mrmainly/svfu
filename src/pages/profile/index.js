import React from "react";

import { Typography, Space, Button } from "antd";

const { Text } = Typography;

const Profile = () => {
    const data = [
        {
            label: "Фамилия:",
            value: "Колесов",
        },
        {
            label: "Имя:",
            value: "Колесов",
        },
        {
            label: "Отчество:",
            value: "Колесов",
        },
        {
            label: "Дата рождения:",
            value: "Колесов",
        },
        {
            label: "Пол:",
            value: "Колесов",
        },
        {
            label: "Телефон:",
            value: "Колесов",
        },
        {
            label: "Почта:",
            value: "Колесов",
        },
        {
            label: "Должность:",
            value: "Колесов",
        },
        {
            label: "Стаж работы:",
            value: "Колесов",
        },
        {
            label: "Направление:",
            value: "Колесов",
        },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {data.map((item, index) => (
                <Space
                    key={index}
                    size="middle"
                    style={{ marginTop: index === 0 ? 0 : 12 }}
                >
                    <div style={{ width: 200 }}>
                        <Text style={{ fontWeight: 600 }}>{item.label}</Text>
                    </div>
                    <Text>{item.value}</Text>
                </Space>
            ))}
            <div
                style={{
                    background: "grey",
                    height: 1,
                    marginLeft: "-24px",
                    marginRight: "-24px",
                    marginTop: 16,
                }}
            />
            <div>
                <Button
                    style={{
                        background: "#0D6EFD",
                        borderRadius: 4,
                        marginTop: 19,
                    }}
                    type="primary"
                    htmlType="submit"
                    size="large"
                >
                    Редактировать профиль
                </Button>
            </div>
        </div>
    );
};

export default Profile;
