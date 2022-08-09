import React, { useState } from "react";

import { Form, Typography, Input, Upload, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { Text } = Typography;

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = (error) => reject(error);
    });

const ProfileForm = () => {
    const [fileList, setFileList] = useState([]);

    const inputs = [
        {
            label: "Фамилия",
            name: "last_name",
            required: true,
            requiredText: "Введите фамилию",
        },
        {
            label: "Имя",
            name: "first_name",
            required: true,
            requiredText: "Введите имя",
        },
        {
            label: "Отчество",
            name: "patronymic",
            required: true,
            requiredText: "Введите отчество",
        },
        {
            label: "Дата рождения",
            name: "birth_date",
            required: false,
            type: "date",
        },
        {
            label: "Почта",
            name: "email",
            required: true,
            requiredText: "Введите вашу почту",
        },
        {
            label: "Телефон",
            name: "phone",
            required: true,
            requiredText: "Введите ваш телефон",
        },
        {
            label: "ИНН",
            name: "inn",
            required: false,
            requiredText: "Введите ваш ИНН",
        },
        {
            label: "СНИЛС",
            name: "snils",
            required: false,
            requiredText: "Введите ваш СНИЛС",
        },
    ];

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

    return (
        <div style={{ width: 350 }}>
            <Form.Item
                name="photo"
                label="Photo"
                valuePropName="fileList"
                labelCol={{ span: 24 }}
                getValueFromEvent={normFile}
            >
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
            </Form.Item>
            {inputs.map((item, index) => (
                <Form.Item
                    key={index}
                    label={
                        <Text
                            style={{
                                fontWeight: 600,
                                fontSize: 16,
                            }}
                        >
                            {item.label}
                        </Text>
                    }
                    name={item.name}
                    rules={[
                        {
                            required: item.required,
                            message: item.requiredText,
                        },
                    ]}
                    labelCol={{ span: 24 }}
                >
                    <Input
                        placeholder={item.requiredText}
                        size="medium"
                        type={item.type ? item.type : ""}
                    />
                </Form.Item>
            ))}
        </div>
    );
};

export default ProfileForm;
