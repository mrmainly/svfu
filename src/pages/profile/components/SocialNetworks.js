import React from "react";
import { Typography, Space } from "antd";

const { Text, Title } = Typography;

const SocialNetworks = ({ data }) => {
    const items = [
        {
            label: "VK:",
            value: data.vk,
        },
        {
            label: "Одноклассники:",
            value: data.ok,
        },
        {
            label: "Youtube:",
            value: data.youtube,
        },
    ];

    return (
        <>
            <Title level={4}>Социальные сети</Title>
            {items.map((item, index) => (
                <Space key={index} size="middle" style={{ marginTop: 12 }}>
                    <div style={{ width: 200 }}>
                        <Text style={{ fontWeight: 600 }}>{item.label}</Text>
                    </div>
                    <Text>
                        {" "}
                        {item.value === "" || item.value === null
                            ? "-"
                            : item.value}
                    </Text>
                </Space>
            ))}
        </>
    );
};

export default SocialNetworks;
