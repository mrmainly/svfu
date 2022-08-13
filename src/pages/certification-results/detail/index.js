import React from "react";
import "./certification_detial.css";
import { Typography, Space } from "antd";

import { MyButton, Line } from "../../../components";

const { Text, Title } = Typography;

const CertificationResultsDetial = () => {
  return (
    <div>
      <div className="title_box">
        <Text level={4} style={{ fontSize: 18 }}>
          Итоги аттестации
        </Text>
        <MyButton style={{ background: "#DC3545" }}>Подать апелляцию</MyButton>
      </div>
      <div style={{ marginTop: 16 }}>
        <Text>
          Квалификация:
          <span style={{ marginLeft: 10 }}>Название_квалификации</span>
        </Text>
      </div>
      <div style={{ marginTop: 16 }}>
        <Text>Тест был начат 15 мая 2022 года, 14:00</Text>
      </div>
      <div style={{ marginTop: 16 }}>
        <Text>Тест проверен 16 мая 2022 года, 12:33</Text>
      </div>
      <div style={{ marginTop: 16 }}>
        <Text>Итоговые баллы:</Text>
      </div>
      <div style={{ marginTop: 16 }}>
        <Text>Протокол о результатах аттестации</Text>
      </div>
      <Line />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Text style={{ fontSize: 18 }}>Заключение теоретической части</Text>
        <div style={{ marginTop: 16 }}>
          <Text>
            Рекомендация:{" "}
            <span style={{ marginLeft: 10 }}>
              Рассмотрев теоретическую часть, пришел к выводу, что вы - гений,
              так держать
            </span>
          </Text>
        </div>
      </div>
      <Line />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Text style={{ fontSize: 18 }}>Заключение теоретической части</Text>
        <div style={{ marginTop: 16 }}>
          <Text>
            Рекомендация:{" "}
            <span style={{ marginLeft: 10 }}>
              Рассмотрев теоретическую часть, пришел к выводу, что вы - гений,
              так держать
            </span>
          </Text>
        </div>
      </div>
      <Line />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <MyButton>Посмотреть итоги аттестации</MyButton>
      </div>
    </div>
  );
};

export default CertificationResultsDetial;
