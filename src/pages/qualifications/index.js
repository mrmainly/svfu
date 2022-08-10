import React from "react";

import { QualificationsTable, MyButton } from "../../components";

const Qualifications = () => {
    return (
        <div>
            <MyButton style={{ marginBottom: 20 }}>
                Загрузить мою квалификацию
            </MyButton>
            <QualificationsTable />
        </div>
    );
};

export default Qualifications;
