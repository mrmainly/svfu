import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Typography, Radio, Space, Checkbox, Input, Form } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { Line, MyButton } from "../../components";
import { SurveysSlice } from "../../reducers/SurveysSlice";

const { Text, Title } = Typography;

const Surveys = () => {
    const { arrayIndex } = useSelector((state) => state.survey_slice);
    const { handleArrayIndex } = SurveysSlice.actions;

    let [arrayPost, setArrayPost] = useState([]);

    const location = useLocation();
    const state = location.state;
    const dispatch = useDispatch();

    const { surveyquest } = state;

    const onSubmitFurther = (data) => {
        console.log(data);
        setArrayPost(arrayPost.push(data));
    };

    console.log(arrayPost);

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
                        <Form
                            style={{ display: "flex", flexDirection: "column" }}
                            onFieldsChange={onSubmitFurther}
                        >
                            {item.question.technique === "ONE_CHOICE" ? (
                                <>
                                    <Text
                                        style={{
                                            marginTop: 12,
                                            marginBottom: 12,
                                        }}
                                    >
                                        Выберите один ответ:
                                    </Text>

                                    <Form.Item
                                        label={
                                            <Text
                                                style={{
                                                    fontWeight: 600,
                                                    fontSize: 16,
                                                }}
                                            >
                                                Логин
                                            </Text>
                                        }
                                        name={`q1`}
                                        labelCol={{ span: 24 }}
                                    >
                                        <Radio.Group>
                                            <Space direction="vertical">
                                                {item.question.variant.map(
                                                    (item, index) => (
                                                        <Radio
                                                            value={item.id}
                                                            key={index}
                                                        >
                                                            {item.name}
                                                        </Radio>
                                                    )
                                                )}
                                            </Space>
                                        </Radio.Group>
                                    </Form.Item>
                                </>
                            ) : item.question.technique === "DESCRIBE" ? (
                                <>
                                    <Text
                                        style={{
                                            marginTop: 12,
                                            marginBottom: 12,
                                        }}
                                    >
                                        Напишите ответ
                                    </Text>
                                    <Space direction="vertical">
                                        <Input />
                                    </Space>
                                </>
                            ) : (
                                <>
                                    <Text
                                        style={{
                                            marginTop: 12,
                                            marginBottom: 12,
                                        }}
                                    >
                                        Выберите несколько ответов:
                                    </Text>
                                    <Space direction="vertical">
                                        {item.question.variant.map(
                                            (item, index) => (
                                                <Checkbox key={index}>
                                                    {item.name}
                                                </Checkbox>
                                            )
                                        )}
                                    </Space>
                                </>
                            )}
                        </Form>
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
                                        dispatch(
                                            handleArrayIndex(arrayIndex - 1)
                                        );
                                    }}
                                >
                                    Назад
                                </MyButton>
                            )}
                            {surveyquest.length - 1 === arrayIndex ? (
                                ""
                            ) : (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "flex-end",
                                        width: "100%",
                                    }}
                                >
                                    <MyButton
                                        onClick={() => {
                                            dispatch(
                                                handleArrayIndex(arrayIndex + 1)
                                            );
                                        }}
                                    >
                                        Далее
                                    </MyButton>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default Surveys;
