import { api } from "./api";

export const surveys = api.injectEndpoints({
    endpoints: (build) => ({
        getSurveys: build.query({
            query: () => `tester/survey/`,
        }),
        getSurveysId: build.query({
            query: ({ id }) => `tester/survey/part-one/${id}`,
        }),
    }),
});

export const { useGetSurveysQuery, useGetSurveysIdQuery } = surveys;
