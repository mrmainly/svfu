import React from "react";
import { Typography, Space } from "antd";

const { Text, Title } = Typography;

const SocialNetworks = () => {
    const data = [
        {
            label: "VK:",
            value: "vk.com",
        },
        {
            label: "Одноклассники:",
            value: "ok.com",
        },
        {
            label: "Youtube:",
            value: "youtube.com",
        },
    ];

    return (
        <>
            <Title level={4}>Социальные сети</Title>
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

export default SocialNetworks;
