import React from "react";

import { Form, Typography, Input, Upload } from "antd";

const { Text, Title } = Typography;
const { TextArea } = Input;

const Diploma = () => {
  const inputs = [
    {
      name: "diploma",
    },
  ];
  return (
    <div style={{ width: 350 }}>
      {inputs.map((item, index) => (
        <Form.Item key={index} name={item.name} label={<Text>Описание</Text>}>
          {/* <Input type="file" /> */}
        </Form.Item>
      ))}
    </div>
  );
};

export default Diploma;
