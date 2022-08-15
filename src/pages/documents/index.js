import React from "react";
import { Typography, Space, Spin, Form } from "antd";
import { FileTwoTone } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import { Line, MyButton } from "../../components";

import { useGetDocumentsQuery } from "../../services/DocumentsService";
import ROUTES from "../../routes";

const { Text } = Typography;

const Documents = () => {
    const navigate = useNavigate();
    const { data, isFetching, error } = useGetDocumentsQuery("");
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
    const inputs = [
        {
            title: "Диплом:",
            value: data.diploma
        },
        {
            title: "Образование, ученое звание и учёные степени:",
            value: data.titles_degrees
        }
    ]
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Form>
                <Space
                    size="middle"
                    style={{
                        marginTop: 12,
                        display: "flex",
                        alignItems: "start",
                    }}
                >
                    <div style={{ width: 200 }}>
                        <Text style={{ fontWeight: 600 }}>Паспорт:</Text>
                    </div>
                    <div>
                        {data.passport === null ? ("-") : (
                            <div>
                                <FileTwoTone />
                                <a href={data?.passport} target="_blank">
                                    document.pdf
                                </a>
                            </div>    
                        )} 
                    </div>
                </Space>
                {inputs.map((it, index) => (
                    <Space
                        key = {index} 
                        size="middle"
                        style={{
                            marginTop: 12,
                            display: "flex",
                            alignItems: "start",
                        }}
                    >   
                        <div style={{ width: 200 }}>
                            <Text style={{ fontWeight: 600 }}>{it.title}</Text>
                        </div>
                        {data.passport === null ? ("-") : (
                            <div style={{
                                display: "flex",
                                alignItems: "start",
                                flexDirection: "column",
                                gap: 5,
                            }}> 
                                {it.value.map((itt, index) => (
                                    <div key = {index} >
                                        <FileTwoTone />
                                        <a href={itt.file} target="_blank">
                                            document.pdf
                                        </a>
                                        <Text style={{marginLeft: 15}}>{itt.name}</Text>
                                    </div>
                                ))}
                            </div>
                        )}
                    </Space>
                ))}
                <Line />
                <MyButton onClick={() => navigate(ROUTES.DOCUMENTS_EDITING)}>
                    Редактировать документы
                </MyButton>
            </Form>
        </div>
    );
};

export default Documents;
