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
const { RangePicker } = DatePicker;

const QualificationEdit = () => {
  const params = useParams();

  const [date_start, setDate_start] = React.useState(new Date());
  const [date_finish, setDate_finish] = React.useState(new Date());

  const [patchQualificationId] = usePatchQualificationIdMutation();
  const { data, isFetching, error } = useGetQualificationsIdQuery({
    id: params.id,
  });

  React.useEffect(() => {
    setDate_start(new Date(data?.date_start));
    setDate_finish(new Date(data?.date_finish));

  }, [data]);

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

  const onSubmit = (data) => {
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("doc_id", data.doc_id);
    formData.append("date_start", date_start.toISOString());
    formData.append("date_finish", date_finish.toISOString());
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

  function onChange(dates, dateStrings) {
    setDate_start(dates[0]);
    setDate_finish(dates[1]);
  }

  console.log(data);
  return (
    <div>
      <Form
        initialValues={{
          ["doc_id"]: data.id,
          ["name"]: data.name,
          ["date_start"]: moment(date_start),
          ["date_finish"]: moment(date_finish),
          // ["file"]: data.file,
          ["created"]: data.date_of_issue,
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
          name="created"
          style={{ width: 350 }}
        >
          <Text style={{ fontWeight: 400, fontSize: 16 }}>{data.created.substring(0, 10)}</Text>
        </Form.Item>
        <Form.Item
          label={
            <Text style={{ fontWeight: 600, fontSize: 16 }}>
              Срок действия:
            </Text>
          }
          style={{ width: 350 }}
          labelCol={{ span: 24 }}
        >
          <RangePicker
          defaultValue={[moment(date_start), moment(date_finish)]}
            onChange={onChange}
            size="large" 
          ></RangePicker>
        </Form.Item>
        {/* <Form.Item
          label={
            <Text style={{ fontWeight: 600, fontSize: 16 }}>Начало срока:</Text>
          }
          style={{ width: 350 }}
          labelCol={{ span: 24 }}
          name="date_start"
        >
          <Input type="date" size="large" />
          <DatePicker
            value={moment(date)}
            onChange={(e) => {
              if (e) setDate(e.toDate());
              else setDate(new Date());
            }}
            size="large" 
          ></DatePicker>
        </Form.Item> */}
        {/* <Form.Item
          label={
            <Text style={{ fontWeight: 600, fontSize: 16 }}>Конец срока:</Text>
          }
          name="date_finish"
          style={{ width: 350 }}
          labelCol={{ span: 24 }}
        >
          <Input size="large" />
        </Form.Item> */}
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
