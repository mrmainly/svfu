import React from "react";
import { Typography, Space } from "antd";

const { Text } = Typography;

const MainInfo = ({ data }) => {
    const items = [
        {
            label: "Логин:",
            value: data.username,
        },
        {
            label: "Фамилия:",
            value: data.last_name,
        },
        {
            label: "Имя:",
            value: data.first_name,
        },
        {
            label: "Отчество:",
            value: data.patronymic,
        },
        {
            label: "Дата рождения:",
            value: data.birth_date,
        },
        {
            label: "Электронная почта:",
            value: data.email,
        },
        {
            label: "Телефон:",
            value: data.phone,
        },
        {
            label: "Инн:",
            value: data.inn,
        },
        {
            label: "СНИЛС:",
            value: data.snils,
        },
    ];

    return (
        <>
            <Space
                size="middle"
                style={{ display: "flex", alignItems: "start" }}
            >
                <div style={{ width: 200 }}>
                    <Text style={{ fontWeight: 600 }}>Фотография:</Text>
                </div>
                <img
                    src="/img/Rectangle34.png"
                    style={{ width: 90, height: 120 }}
                />
            </Space>
            {items.map((item, index) => (
                <Space key={index} size="middle" style={{ marginTop: 12 }}>
                    <div style={{ width: 200 }}>
                        <Text style={{ fontWeight: 600 }}>{item.label}</Text>
                    </div>
                    <Text>
                        {item.value === "" || item.value === null
                            ? "-"
                            : item.value}
                    </Text>
                </Space>
            ))}
        </>
    );
};

export default MainInfo;
