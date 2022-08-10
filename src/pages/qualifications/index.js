import React from "react";
import { useNavigate } from "react-router-dom";

import { QualificationsTable, MyButton } from "../../components";
import ROUTES from "../../routes";

const Qualifications = () => {
    const navigate = useNavigate();

    const data = [
        {
            number_doc: "1321",
            name: "Название_квалификации",
            date: "20.08.2022",
            id: 1,
        },
    ];

    return (
        <div>
            <MyButton
                style={{ marginBottom: 20 }}
                onClick={() => navigate(ROUTES.QUALIFICATION_ADDED)}
            >
                Загрузить мою квалификацию
            </MyButton>
            <QualificationsTable data={data} />
        </div>
    );
};

export default Qualifications;
