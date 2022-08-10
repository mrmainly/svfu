import React from "react";

import { CerificationResultsTable } from "../../components";

const Test = () => {
  const data = [
    {
      qualification: "Название_квалификации",
      date: "20.08.2022, 14:00",
      id: 1,
      status: "Не проверено",
      time: "1 час 30 минут",
      points: 25,
    },
  ];

  return (
    <div>
      <CerificationResultsTable data={data} />
    </div>
  );
};

export default Test;
