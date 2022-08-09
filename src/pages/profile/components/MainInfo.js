import React from "react";
import { Typography, Space } from "antd";

const { Text } = Typography;

const MainInfo = () => {
    const data = [
        {
            label: "Логин:",
            value: "Колесов",
        },
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
            label: "Электронная почта:",
            value: "Колесов",
        },
        {
            label: "Телефон:",
            value: "Колесов",
        },
        {
            label: "Инн:",
            value: "Колесов",
        },
        {
            label: "СНИЛС:",
            value: "Колесов",
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
            {data.map((item, index) => (
                <Space key={index} size="middle" style={{ marginTop: 12 }}>
                    <div style={{ width: 200 }}>
                        <Text style={{ fontWeight: 600 }}>{item.label}</Text>
                    </div>
                    <Text>{item.value}</Text>
                </Space>
            ))}
        </>
    );
};

export default MainInfo;
