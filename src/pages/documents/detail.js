import React from "react";
import { Typography, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { MyButton, Line } from "../../components";

const { Text, Title } = Typography;

const DocumentDetail = () => {
  return (
    <div>
      <Text style={{ fontSize: 18 }}>Паспорт</Text>
      <Form>
        <Form.Item
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
          style={{ width: 300 }}
        >
          <Upload>
            {" "}
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
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
