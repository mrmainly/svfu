import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Spin, Space, Typography } from "antd";

import { useGetSurveysIdQuery } from "../../services/SurveysService";
import { Line, MyButton } from "../../components";
import ROUTES from "../../routes";

const { Text } = Typography;

const TestDetail = () => {
    const params = useParams();

    const { data, isFetching, error } = useGetSurveysIdQuery({ id: params.id });
    const navigate = useNavigate();

    if (isFetching) {
        return (
            <div
                style={{
                    height: 210,
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: 100,
                }}
            >
                <Spin />
            </div>
        );
    }

    console.log("detail", data);

    const items = [
        {
            label: "Квалификация",
            value: data.name,
        },
        {
            label: "Начало доступа:",
            value: data.exam_date_start,
        },
        {
            label: "Конец доступа:",
            value: data.exam_date_finish,
        },
        {
            label: "Время на выполнение:",
            value: `${data.time_exam} мин`,
        },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {items.map((item, index) => (
                <Space
                    size="large"
                    key={index}
                    style={{ marginTop: index === 0 ? 0 : 15 }}
                >
                    <div style={{ width: 150, fontWeight: 600 }}>
                        {item.label}
                    </div>
                    <Text>{item.value}</Text>
                </Space>
            ))}
            <Line />
            <MyButton
                onClick={() =>
                    navigate(ROUTES.SURVEYS, {
                        state: { surveyquest: data.surveyquest },
                    })
                }
            >
                Начать тестирование
            </MyButton>
        </div>
    );
};

export default TestDetail;
