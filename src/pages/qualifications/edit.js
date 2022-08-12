import React from "react";
import { Form, Space, Typography, Spin, Input, message } from "antd";
import { useParams } from "react-router-dom";
import { MyButton, Line } from "../../components";
import {
    useGetQualificationsIdQuery,
    usePatchQualificationIdMutation,
} from "../../services/QualificationsService";

const { Text } = Typography;

const QualificationEdit = () => {
    const params = useParams();

    const [patchQualificationId] = usePatchQualificationIdMutation();
    const { data, isFetching, error } = useGetQualificationsIdQuery({
        id: params.id,
    });
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
                fsfds
            </div>
        );
    }

    const inputs = [
        {
            title: "Номер документа:",
            name: "doc_id",
        },
        {
            title: "Название квалификации:",
            name: "name",
        },
        // {
        //     title: "Дата выдачи документа:",
        //     name: "created",
        //     type: "date",
        // },
        // {
        //     title: "Начало срока:",
        //     name: "date_start",
        // },
        // {
        //     title: "Окончание срока:",
        //     name: "date_finish",
        // },
        // {
        //     title: "Скан документа:",
        //     name: "file",
        // },
    ];

    const onSubmit = (data) => {
        console.log(data);
        let formData = new FormData();
        formData.append("name", data.name);
        formData.append("doc_id", data.doc_id);
        patchQualificationId({ id: data.doc_id, formData: formData }).then(
            (res) => {
                if (res.data) {
                    message.success("Документ изменен");
                } else {
                    message.error(`${res.error.data.errors[0]}`);
                }
            }
        );
    };

    return (
        <div>
            <Form
                initialValues={{
                    //   ["file"]: data.file,
                    ["doc_id"]: data.id,
                    // ["date_start"]: data.date_start,
                    // ["date_finish"]: data.date_finish,
                    ["name"]: data.name,
                    //   ["created"]: data.created.substring(0, 10),
                }}
                onFinish={(data) => onSubmit(data)}
            >
                {inputs.map((item, index) => (
                    <Form.Item
                        key={index}
                        label={
                            <Text style={{ fontWeight: 600, fontSize: 16 }}>
                                {item.title}
                            </Text>
                        }
                        name={item.name}
                        labelCol={{ span: 24 }}
                        style={{ width: 350 }}
                    >
                        <Input placeholder={item.text} size="large" />
                    </Form.Item>
                ))}
                <Line />
                <MyButton htmlType="submit">Загрузить</MyButton>
            </Form>
        </div>
    );
};

export default QualificationEdit;
