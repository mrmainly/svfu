import React, { useState, useRef } from "react";
import {
  Typography,
  Space,
  Spin,
  Form,
  Button,
  Modal,
  Select,
  Upload,
  Input,
  message,
} from "antd";
import { FileTwoTone, EditOutlined, UploadOutlined } from "@ant-design/icons";

import { Line, MyButton } from "../../components";

import {
  useGetDocumentsQuery,
  usePostDocumentsDiplomaMutation,
  usePostDocumentsMutation,
  usePostDocumentsTitlesMutation,
} from "../../services/DocumentsService";

const { Option } = Select;

const { Text } = Typography;

const Documents = () => {
  const [postDocumentsDiploma] = usePostDocumentsDiplomaMutation();
  const [postDocumentsTitles] = usePostDocumentsTitlesMutation();
  const [postDocuments] = usePostDocumentsMutation();
  let valRef = useRef();
  const [value, setValue] = useState();
  const [file, setFile] = useState("");
  const [modalNewDoc, setModalNewDoc] = useState(false);
  const [modalEditDoc, setModalEditDoc] = useState(false);
  const { data, isFetching, error } = useGetDocumentsQuery("");
  const props = {
    beforeUpload: (file) => {
      setFile(file);
      const isPDF = file.type === "application/pdf";

      if (!isPDF) {
        message.error(`${file.name} не является pdf файлом`);
        return isPDF || Upload.LIST_IGNORE;
      }

      return false;
    },
  };
  console.log(value);
  const onSubmit = () => {
    let formData = new FormData();
    switch (value) {
      case "Паспорт":
        formData.append("passport", file);
        postDocuments({ formData: formData }).then((res) => {
          if (res.data) {
            message.success("Документ изменен");
          } else {
            message.error(`${res.error.data.errors[1]}`);
          }
        });
        break;
      case "Диплом":
        formData.append("file", file);
        formData.append("name", valRef.current.input.value);
        postDocumentsDiploma({ formData: formData }).then((res) => {
          if (res.data) {
            message.success("Документ изменен");
          } else {
            message.error(`${res.error.data.errors[1]}`);
          }
        });
        break;
      case "Образование":
        formData.append("file", file);
        formData.append("name", valRef.current.input.value);
        postDocumentsTitles({ formData: formData }).then((res) => {
          if (res.data) {
            message.success("Документ изменен");
          } else {
            message.error(`${res.error.data.errors[1]}`);
          }
        });
        break;
    }

    setModalNewDoc(false);
  };

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
      value: data.diploma,
    },
    {
      title: "Образование, ученое звание и учёные степени:",
      value: data.titles_degrees,
    },
  ];
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
            {data.passport === null ? (
              ""
            ) : (
              <div>
                <FileTwoTone />
                <a href={data?.passport} target="_blank">
                  document.pdf
                </a>
              </div>
            )}
          </div>
          <EditOutlined style={{ marginLeft: 20, color: "green" }} />
        </Space>
        {inputs.map((it, index) => (
          <Space
            key={index}
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
            <div
              style={{
                display: "flex",
                alignItems: "start",
                flexDirection: "column",
                gap: 5,
              }}
            >
              {it.value.map((itt, index) => (
                <div key={index}>
                  <FileTwoTone />
                  <a href={itt.file} target="_blank">
                    document.pdf
                  </a>
                  <Text style={{ marginLeft: 15 }}>{itt.name}</Text>
                </div>
              ))}
            </div>
            <EditOutlined style={{ marginLeft: 20, color: "green" }} />
          </Space>
        ))}
        <Line />
        <MyButton onClick={() => setModalNewDoc(true)}>
          Добавить документы
        </MyButton>
      </Form>
      <Modal
        destroyOnClose={true}
        title="Добавить документы"
        style={{
          top: 20,
        }}
        visible={modalNewDoc}
        onOk={() => setModalNewDoc(false)}
        onCancel={() => setModalNewDoc(false)}
        footer={[
          <Button key="back" onClick={() => setModalNewDoc(false)}>
            Отмена
          </Button>,
          <Button key="submit" type="primary" onClick={onSubmit}>
            Сохранить
          </Button>,
        ]}
      >
        <Text style={{ fontWeight: 600, fontSize: 16 }}>Тип документа</Text>
        <div style={{ marginTop: "10px" }}>
          <Select
            defaultValue="Выберите тип документа"
            style={{
              width: "100%",
            }}
            onChange={(value) => setValue(value)}
          >
            <Option value="Паспорт">Паспорт</Option>
            <Option value="Диплом">Диплом</Option>
            <Option value="Образование">
              Образование, ученое звание и учёные степени
            </Option>
          </Select>
        </div>
        {value === "Паспорт" ? (
          <></>
        ) : (
          <div style={{ marginTop: "10px" }}>
            <Text style={{ fontWeight: 600, fontSize: 16 }}>Описание</Text>
            <Input
              style={{ marginTop: "10px" }}
              size="large"
              ref={valRef}
              type="text"
            />
          </div>
        )}

        <div style={{ marginTop: "10px" }}>
          <Upload
            action="none"
            {...props}
            name="passport"
            multiple={false}
            maxCount={1}
            labelCol={{ span: 24 }}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </div>
      </Modal>
    </div>
  );
};

export default Documents;
