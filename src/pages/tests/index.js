import React from "react";
import { Spin } from "antd";

import { AvailableTestTable } from "../../components";
import { useGetSurveysQuery } from "../../services/SurveysService";
import ROUTES from "../../routes";

const Test = () => {
    const { data, isLoading, error } = useGetSurveysQuery("");

    // const data = [
    //     {
    //         name: "Название_тестирования фывфы вфыв фывфы в",
    //         date: "20.08.2022, 14:00",
    //         id: 1,
    //         status: "Не проверено",
    //         time: "1 час 30 минут",
    //         points: 150,
    //     },
    // ];
    if (isLoading) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    height: "100vh",
                }}
            >
                <Spin />
            </div>
        );
    }

    console.log(data);

    return (
        <div>
            <AvailableTestTable data={data} routes={ROUTES.TEST_DETAIL} />
        </div>
    );
};

export default Test;
