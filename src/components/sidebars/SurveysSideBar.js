import React from "react";

import { Typography, Button, Space } from "antd";

import "./surveySideBar.css";
import MyButton from "../UI/button";

const { Text } = Typography;

const SurveysSideBar = ({ data, name, time }) => {
    const dataItems = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    ];
    return (
        <div style={{ marginLeft: 28 }}>
            <Text style={{ fontWeight: 600 }}>Название теста</Text>
            <div className="root">
                <Text style={{ marginLeft: 12 }}>Теоретическая часть:</Text>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {data
                        ? data.map((item, index) => (
                              <div key={index} className="circul">
                                  {index + 1}
                              </div>
                          ))
                        : dataItems.map((item, index) => (
                              <div key={index} className="circul">
                                  {index + 1}
                              </div>
                          ))}
                </div>
            </div>
            <div className="practic-block">
                <Text>Практическая часть:</Text>
                <Button
                    type="default"
                    style={{
                        borderColor: "#0D6EFD",
                        color: "#0D6EFD",
                        width: "100%",
                        marginTop: 6,
                        borderRadius: 3,
                    }}
                    size="large"
                >
                    Задание П.Ч.
                </Button>
            </div>
            <div className="time-block">
                <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                >
                    <Text>Общее время:</Text>
                    <Text>45:00</Text>
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: 8,
                    }}
                >
                    <Text>Общее время:</Text>
                    <Text>45:00</Text>
                </div>
            </div>
            <Button
                type="default"
                style={{
                    borderColor: "#BF4C25",
                    color: "#BF4C25",
                    width: "100%",
                    marginTop: 12,
                    borderRadius: 3,
                }}
                size="large"
            >
                Завершить тест
            </Button>
        </div>
    );
};

export default SurveysSideBar;
