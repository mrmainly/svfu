import React from "react";
import {
    Typography,
    Form,
    message,
    Input,
    Upload,
    Button,
    Space,
    Spin,
} from "antd";
import {
    UploadOutlined,
    FileTwoTone,
    MinusCircleOutlined,
    PlusOutlined,
} from "@ant-design/icons";

import Diploma from "./components/Diploma";
import { Line, MyButton } from "../../../components";
import {
    useGetDocumentsQuery,
    usePostDocumentsMutation,
    usePostDocumentsDiplomaMutation,
    usePatchDocumentsDiplomaMutation,
} from "../../../services/DocumentsService";

const DocumentDetail = () => {
    const { data, isFetching, error } = useGetDocumentsQuery("");
    const [patchDocumentsDiploma] = usePatchDocumentsDiplomaMutation();

    const onSubmit = (data) => {
        patchDocumentsDiploma(data).then((res) => {
            if (res.data) {
                message.success("Профиль изменен");
            } else {
                message.error(
                    `${res.error.data.errors[0]} ${res.error.data.errors[1]}`
                );
            }
            console.log(res);
        });
        console.log(data);
    };

    console.log("file", data?.diploma);

    return (
        <div>
            {isFetching ? (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        height: "100vh",
                        alignItems: "center",
                    }}
                >
                    <Spin />
                </div>
            ) : (
                <div>
                    <Diploma data={data.diploma} />
                    <Line />
                    <MyButton htmlType="submit">Сохранить</MyButton>
                </div>
            )}
        </div>
    );
};

export default DocumentDetail;
