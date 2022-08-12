import React from "react";
import moment from "moment";
import {
  Form,
  Space,
  Typography,
  Spin,
  Input,
  message,
  DatePicker,
} from "antd";
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

    {
      title: "Дата выдачи документа:",
      name: "created",
      type: "date",
    },
    {
      title: "Начало срока:",
      name: "date_start",
    },
    {
      title: "Окончание срока:",
      name: "date_finish",
    },
    {
      title: "Скан документа:",
      name: "file",
    },
  ];
  const onSubmit = (data) => {
    console.log(data);
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("doc_id", data.doc_id);
    formData.append("date_start", data.doc_id);
    // formData.append("date_of_issue", data.doc_id);
    // formData.append("date_finish", data.doc_id);
    patchQualificationId({ id: data.doc_id, formData: formData }).then(
      (res) => {
        if (res.data) {
          message.success("Документ изменен");
        } else {
          message.error(`${res.error.data.errors[1]}`);
        }
      }
    );
  };
  console.log(data);
  return (
    <div>
      <Form
        initialValues={{
          ["doc_id"]: data.id,
          ["name"]: data.name,
          ["date_start"]: data.date_start,
          // ["date_finish"]: data.date_finish,
          // ["file"]: data.file,
          // ["created"]: data.date_of_issue,
        }}
        onFinish={(data) => onSubmit(data)}
      >
        <Form.Item
          label={
            <Text style={{ fontWeight: 600, fontSize: 16 }}>
              Номер документа
            </Text>
          }
          name="doc_id"
          style={{ width: 350 }}
        >
          <Text style={{ fontWeight: 400, fontSize: 16 }}>{data.id}</Text>
        </Form.Item>
        <Form.Item
          label={
            <Text style={{ fontWeight: 600, fontSize: 16 }}>
              Название квалификации
            </Text>
          }
          name="name"
          style={{ width: 350 }}
          labelCol={{ span: 24 }}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label={
            <Text style={{ fontWeight: 600, fontSize: 16 }}>
              Дата выдачи документа:
            </Text>
          }
          style={{ width: 350 }}
          labelCol={{ span: 24 }}
        >
          <Input size="large" />
        </Form.Item>
        <Form.Item
          label={
            <Text style={{ fontWeight: 600, fontSize: 16 }}>Начало срока:</Text>
          }
          name="date_start"
          style={{ width: 350 }}
          labelCol={{ span: 24 }}
        >
          <Input type="date" size="large" />
        </Form.Item>
        <Form.Item
          label={
            <Text style={{ fontWeight: 600, fontSize: 16 }}>Конец срока:</Text>
          }
          name="date_finish"
          style={{ width: 350 }}
          labelCol={{ span: 24 }}
        >
          <Input size="large" />
        </Form.Item>
        {/* {inputs.map((item, index) => (
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
        ))} */}
        <Line />
        <MyButton htmlType="submit">Загрузить</MyButton>
      </Form>
    </div>
  );
};

export default QualificationEdit;
