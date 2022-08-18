import React from "react";
import { Form, Space, Typography, Spin } from "antd";
import { FileTwoTone } from "@ant-design/icons";
import { useParams, useNavigate } from "react-router-dom";

import { MyButton, Line } from "../../components";
import { useGetQualificationsIdQuery } from "../../services/QualificationsService";
import ROUTES from "../../routes";

const { Text } = Typography;

const QualificationDetail = () => {
  const params = useParams();
  const navigate = useNavigate();

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
  console.log(data);
  const inputs = [
    {
      title: "Номер документа:",
      value: data.id,
    },
    {
      title: "Название квалификации:",
      value: data.name,
    },
    {
      title: "Дата выдачи документа:",
      value:
        data.created === "" || data.created === null
          ? "-"
          : data.created.substring(0, 10),
    },
    {
      title: "Начало срока:",
      value:
        data.date_start === "" || data.date_start === null
          ? "-"
          : data.date_start.substring(0, 10),
    },
    {
      title: "Окончание срока:",
      value:
        data.date_finish === "" || data.date_finish === null
          ? "-"
          : data.date_finish.substring(0, 10),
    },
    {
      title: "Скан документа:",
      value: data.file,
    },
  ];

  return (
    <div>
      <Form>
        {inputs.map((item, index) => (
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
              <Text style={{ fontWeight: 600 }}>{item.title}</Text>
            </div>
            {item.value === data.file ? (
              <div>
                <FileTwoTone />
                <a href={item.value} target="_blank">
                  {item.value.split("/")[5]}
                </a>
              </div>
            ) : (
              <Text>
                {item.value === "" || item.value === null ? "-" : item.value}
              </Text>
            )}
          </Space>
        ))}
        <Line />
        <MyButton
          onClick={() => navigate(`${ROUTES.QUALIFICATION_EDITING}/${data.id}`)}
        >
          Редактировать квалификацию
        </MyButton>
      </Form>
    </div>
  );
};

export default QualificationDetail;
