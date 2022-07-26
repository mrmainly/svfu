import React from "react";

import { AvailableTestTable } from "../../components";

const Test = () => {
    const data = [
        {
            name: "Название_тестирования фывфы вфыв фывфы в",
            date: "20.08.2022, 14:00",
            id: 1,
            status: "Не проверено",
            time: "1 час 30 минут",
            points: 150,
        },
    ];

    return (
        <div>
            <AvailableTestTable data={data} />
        </div>
    );
};

export default Test;
