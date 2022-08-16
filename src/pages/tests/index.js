import React from "react";
import { Spin } from "antd";

import { AvailableTestTable } from "../../components";
import { useGetSurveysQuery } from "../../services/SurveysService";
import ROUTES from "../../routes";

const Test = () => {
    const { data, isLoading, error } = useGetSurveysQuery("");

    console.log(data);

    return (
        <div>
            <AvailableTestTable
                data={data}
                routes={ROUTES.TEST_DETAIL}
                loading={isLoading}
            />
        </div>
    );
};

export default Test;
