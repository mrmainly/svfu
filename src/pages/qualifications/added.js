import React from "react";
import { Form, Input, Typography } from "antd";

import { MyButton, Line } from "../../components";

const { Text } = Typography;

const QualificationAdded = () => {
    const inputs = [
        {
            title: "Номер документа:",
            name: "nomber_document",
            text: "Введите номер документа",
        },
        {
            title: "Название квалификации:",
            name: "nomber_qual",
            text: "Введите номер квалификации",
        },
        {
            title: "Дата выдачи документа:",
            name: "nomber_document",
            text: "Введите дату выдачу документа",
            type: "date",
        },
        {
            title: "Срок действия",
            name: "date_srok",
            text: "Введите срок действия",
            type: "date",
        },
    ];

    return (
        <div>
            <Form>
                {inputs.map((item, index) => (
                    <Form.Item
                        label={
                            <Text style={{ fontWeight: 600, fontSize: 16 }}>
                                {item.title}
                            </Text>
                        }
                        name={item.name}
                        required
                        rules={[
                            {
                                required: true,
                                message: item.text,
                            },
                        ]}
                        labelCol={{ span: 24 }}
                        style={{ width: 350 }}
                    >
                        <Input
                            placeholder={item.text}
                            size="large"
                            type={item.type}
                        />
                    </Form.Item>
                ))}
                <Line />
                <MyButton htmlType="submit">Загрузить</MyButton>
            </Form>
        </div>
    );
};

export default QualificationAdded;
