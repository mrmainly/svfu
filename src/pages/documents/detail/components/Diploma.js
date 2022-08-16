import React, { useState } from "react";
import { UploadOutlined, DeleteOutlined } from "@ant-design/icons";

import { Form, Typography, Input, Upload, Button } from "antd";

const { Text, Title } = Typography;
const { TextArea } = Input;

const Diploma = ({ data }) => {
    const [localData, setLocalData] = useState(
        JSON.parse(JSON.stringify(data))
    );
    const [photo, setPhoto] = useState();
    let [idCounter, setIdCounter] = useState(data.length);

    const addInput = async (e) => {
        setIdCounter((idCounter += 1));
        let newInput = localData.concat({
            created: "2022-08-15T18:56:39.473183",
            document: "",
            file: "https://notalone.medic.fun/media/diploma/%D0%B4%D0%B8%D0%BF%D0%BB%D0%BE%D0%BC_1.pdf",
            id: idCounter,
            is_verify: false,
            name: "",
            updated: "2022-08-15T18:58:26.556764",
        });
        setLocalData(newInput);
    };

    const handleText = (id) => (e) => {
        let newLocalData = [...localData];
        newLocalData[id - 1].name = e.target.value;
        // console.log((newLocalData[0].document = 123));
        setLocalData(newLocalData);
    };

    const handleFile = (id) => (e) => {
        let newLocalData = [...localData];
        newLocalData[id - 1].file = e.file.originFileObj;
        setLocalData(newLocalData);
    };

    const handleDelete = (i) => {
        setIdCounter(idCounter - 1);
        setLocalData(localData.filter((tag) => tag.id !== i));
    };

    return (
        <div style={{ width: 350 }}>
            <Text style={{ fontSize: 18 }}>Диплом</Text>
            {localData.map((item, index) => (
                <div
                    key={index}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: 20,
                    }}
                >
                    <input
                        style={{ marginRight: 20 }}
                        placeholder="Описание"
                        value={item.name}
                        onChange={handleText(item.id)}
                    />
                    <Upload
                        listType=""
                        multiple={false}
                        maxCount={1}
                        onChange={handleFile(item.id)}
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>
                    <a href={item.file} style={{ marginLeft: 20 }}>
                        document.pdf
                    </a>
                    <DeleteOutlined
                        style={{ marginLeft: 20, color: "red" }}
                        onClick={() => handleDelete(item.id)}
                    />
                </div>
            ))}
            <Button style={{ marginTop: 20 }} onClick={() => addInput()}>
                + Добавить документ
            </Button>
            <Button onClick={() => console.log(localData)}>asd</Button>
        </div>
    );
};

export default Diploma;
