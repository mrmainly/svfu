import React, { useState } from "react";
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
} from "antd";
import { FileTwoTone, EditOutlined, UploadOutlined } from "@ant-design/icons";

import { useNavigate } from "react-router-dom";

import { Line, MyButton } from "../../components";

import { useGetDocumentsQuery } from "../../services/DocumentsService";
import ROUTES from "../../routes";

const { Option } = Select;

const { Text } = Typography;

const Documents = () => {
  const [file, setFile] = useState("");

  const [modalNewDoc, setModalNewDoc] = useState(false);
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
              "-"
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
            {data.passport === null ? (
              "-"
            ) : (
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
            )}
            <EditOutlined style={{ marginLeft: 20, color: "green" }} />
          </Space>
        ))}
        <Line />
        <MyButton onClick={() => setModalNewDoc(true)}>
          Добавить документы
        </MyButton>
        <Modal
          title="20px to Top"
          style={{
            top: 20,
          }}
          visible={modalNewDoc}
          onOk={() => setModalNewDoc(false)}
          onCancel={() => setModalNewDoc(false)}
        >
          <Text>Тип документа</Text>
          <Select
            defaultValue="Выберите тип документа"
            style={{
              width: "100%",
            }}
            // onChange={handleChange}
          >
            <Option value="Пасспорт">Паспорт</Option>
            <Option value="Диплом">Диплом</Option>
            <Option value="Образование, ученое звание и учёные степени">
              Образование, ученое звание и учёные степени
            </Option>
          </Select>
          <p>some contents...</p>
          <p>some contents...</p>
          <p>some contents...</p>
          <Upload
            name="passport"
            multiple={false}
            maxCount={1}
            labelCol={{ span: 24 }}
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Modal>
      </Form>
    </div>
  );
};

export default Documents;
