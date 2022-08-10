import React from "react";
import { Typography, Space } from "antd";
import { useNavigate } from "react-router-dom";

import ROUTES from "../../routes";
import { Line, MyButton } from "../../components";

const { Text } = Typography;

const Documents = () => {
    const navigate = useNavigate();

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Space size="large">
                <div style={{ width: 150 }}>
                    <Text>Паспорт:</Text>
                </div>
                <Text style={{ color: "#0D6EFD", cursor: "pointer" }}>
                    document.pdf
                </Text>
            </Space>
            <Space size="large" style={{ marginTop: 12 }}>
                <div style={{ width: 150 }}>
                    <Text>Диплом:</Text>
                </div>
                <Text style={{ color: "#0D6EFD", cursor: "pointer" }}>
                    document.pdf
                    <span style={{ color: "black", marginLeft: 5 }}>
                        описание описание ткекстепкстекст
                    </span>
                </Text>
            </Space>
            <Space size="large" style={{ marginTop: 12 }}>
                <div style={{ width: 150 }}>
                    <Text>Образование, ученое звание и учёные степени:</Text>
                </div>
                <Text style={{ color: "#0D6EFD", cursor: "pointer" }}>
                    document.pdf
                    <span style={{ color: "black", marginLeft: 5 }}>
                        описание описание ткекстепкстекст
                    </span>
                </Text>
            </Space>
            <Line />
            <MyButton onClick={() => navigate(ROUTES.DOCUMENTS_EDITING)}>
                Редактировать документы
            </MyButton>
        </div>
    );
};

export default Documents;
