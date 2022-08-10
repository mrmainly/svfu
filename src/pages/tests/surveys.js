import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Typography, Radio, Space } from "antd";

import { Line, MyButton } from "../../components";

const { Text, Title } = Typography;

const Surveys = () => {
    const [arrayIndex, setArrayIndex] = useState(0);
    const [arrayPost, setArrayPost] = useState([]);

    const location = useLocation();
    const state = location.state;

    const { surveyquest } = state;

    return (
        <div>
            {surveyquest
                .filter((item, index) => index === arrayIndex)
                .map((item, index) => (
                    <div
                        key={index}
                        style={{ display: "flex", flexDirection: "column" }}
                    >
                        <Title level={4}>Вопрос №{arrayIndex + 1}</Title>
                        <Text style={{ marginTop: 12 }}>
                            {item.question.description}
                        </Text>
                        <Text style={{ marginTop: 12, marginBottom: 12 }}>
                            Выберите один ответ:
                        </Text>
                        <Radio.Group>
                            <Space direction="vertical">
                                {item.question.variant.map((item, index) => (
                                    <Radio value={item.id} key={index}>
                                        {item.name}
                                    </Radio>
                                ))}
                            </Space>
                        </Radio.Group>
                        <Line />
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            {arrayIndex === 0 ? (
                                ""
                            ) : (
                                <MyButton
                                    onClick={() => {
                                        setArrayIndex((prev) => prev - 1);
                                    }}
                                >
                                    Назад
                                </MyButton>
                            )}
                            {surveyquest.length - 1 === arrayIndex ? (
                                ""
                            ) : (
                                <MyButton
                                    onClick={() => {
                                        setArrayIndex((prev) => prev + 1);
                                    }}
                                >
                                    Далее
                                </MyButton>
                            )}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Surveys;
