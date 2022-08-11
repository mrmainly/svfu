import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetQualificationsQuery } from "../../services/QualificationsService";
import { QualificationsTable, MyButton } from "../../components";
import ROUTES from "../../routes";

const Qualifications = () => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetQualificationsQuery("");

  // const data = [
  //     {
  //         number_doc: "1321",
  //         name: "Название_квалификации",
  //         date: "20.08.2022",
  //         id: 1,
  //     },
  // ];
  console.log("qu index", data);

  return (
    <div>
      <MyButton
        style={{ marginBottom: 20 }}
        onClick={() => navigate(ROUTES.QUALIFICATION_ADDED)}
      >
        Загрузить мою квалификацию
      </MyButton>
      <QualificationsTable
        data={data}
        routes={ROUTES.QUALIFICATION_DETAIL}
        loading={isLoading}
      />
    </div>
  );
};

export default Qualifications;
