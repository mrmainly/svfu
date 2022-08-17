import { api } from "./api";
import { SurveysSlice } from "../reducers/SurveysSlice";

const { getData } = SurveysSlice.actions;

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
                    dispatch(getData(data));
                } catch (err) {
                    console.log(err);
                }
            },
        }),
        surveyPost: build.mutation({
            query({ body, id }) {
                return {
                    url: `tester/survey/part-one/${id}`,
                    method: "POST",
                    body,
                };
            },
        }),
        surveyPatch: build.mutation({
            query({ id }) {
                return {
                    url: `tester/survey/part-one/${id}`,
                    method: "PATCH",
                };
            },
        }),
    }),
});

export const {
    useGetSurveysQuery,
    useGetSurveysIdQuery,
    useSurveyPostMutation,
    useSurveyPatchMutation,
} = surveys;
