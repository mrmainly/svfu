import { api } from "./api";

export const surveys = api.injectEndpoints({
    endpoints: (build) => ({
        getSurveys: build.query({
            query: () => `tester/survey/`,
        }),
    }),
});

export const { useGetSurveysQuery } = surveys;
