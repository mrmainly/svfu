import React from "react";
import { Typography, Space, Form, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Text } = Typography;

const MainInfo = ({ data }) => {
    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const normFile = (e) => {
        console.log("Upload event:", e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

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
                <Upload
                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    listType="picture-card"
                    multiple={false}
                    name="photo"
                    maxCount={1}
                    // onPreview={handlePreview}
                >
                    {uploadButton}
                </Upload>
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
