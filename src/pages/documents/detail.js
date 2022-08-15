import React, { useState } from "react";
import { Typography, Form, message, Input, Upload, Button, Space } from "antd";
import { UploadOutlined, FileTwoTone, MinusCircleOutlined, PlusOutlined  } from "@ant-design/icons";

import { MyButton, Line } from "../../components";

import { useGetDocumentsQuery, usePostDocumentsMutation, usePostDocumentsDiplomaMutation } from "../../services/DocumentsService";

const { Text, Title } = Typography;



const DocumentDetail = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { data, isFetching, error } = useGetDocumentsQuery("");
  const [postDocumentsDiploma] = usePostDocumentsDiplomaMutation();

  const handleUpload = () => {
    let formData = new FormData();
    fileList.forEach((file) => {
      formData.append('files[]', file);
    });
    setUploading(true); // You can use any AJAX library you like

    postDocumentsDiploma({ formData: formData })
      .then((res) => {
        if (res.data) {
          setFileList([]);
          message.success("Документ(ы) загружены");
        } else {
          message.error(`${res.error.data.errors[0]}`);
        }
      })
      .catch(() => {
        message.error('upload failed.');
      })
      .finally(() => {
        setUploading(false);
      });
  };



  const props = {
    onChange({ file, fileList }) {
      console.log("sdsd", data.diploma.file)
    },
    
    accept: ".pdf",
    defaultFileList: [
      {
        uid: '1',
        name: 'document.pdf',
        status: 'done',
        response: 'Server Error 500',
        // custom error message to show
        url: data.diploma.map.file,
      },
    ],
  };
  
  return (
    <div>
      <Text style={{ fontSize: 18 }}>Паспорт</Text>
      <Form layout="vertical">
      <Form.List name="users">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  display: 'flex',
                  marginBottom: 8,
                }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  label={ <Text style={{ fontSize: 18 }}>Описание</Text>}
                  name={[name, 'first']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing first name',
                    },
                  ]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label={ <Text style={{ fontSize: 18 }}>Загрузить документ</Text>}
                  name={[name, 'last']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing last name',
                    },
                  ]}
                >
                 
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                  </Upload>
                </Form.Item>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-between"}} >
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </div>
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
        {/* <Form.Item
          label={
            <Text style={{ fontWeight: 600, fontSize: 16 }}>
              Загрузить документ
            </Text>
          }
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your login!",
            },
          ]}
          labelCol={{ span: 24 }}
          style={{ 
            width: 300 
          }}
        >
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item> */}
    </Form>
      <Line />
      <div style={{ display: "flex" }}>
        <MyButton>Сохранить</MyButton>
        <MyButton style={{ marginLeft: 20, background: "#6C757D" }}>
          Отмена
        </MyButton>
      </div>
    </div>
  );
};

export default DocumentDetail;
