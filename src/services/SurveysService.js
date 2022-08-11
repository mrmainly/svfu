import { api } from "./api";
import { SurveysSlice } from "../reducers/SurveysSlice";

const { surveyDispatch } = SurveysSlice.actions;

export const surveys = api.injectEndpoints({
    endpoints: (build) => ({
        getSurveys: build.query({
            query: () => `tester/survey/`,
        }),
        getSurveysId: build.query({
            query: ({ id }) => `tester/survey/part-one/${id}`,
            async onQueryStarted(undefiend, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(surveyDispatch(data));
                } catch (err) {
                    console.log(err);
                }
            },
        }),
    }),
});

export const { useGetSurveysQuery, useGetSurveysIdQuery } = surveys;
