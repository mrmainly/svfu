import { api } from "./api";

export const qualifications = api.injectEndpoints({
  endpoints: (build) => ({
    getQualifications: build.query({
      query: () => `users/qualification_improvement/`,
    }),
    getQualificationsId: build.query({
      query: ({ id }) => `users/qualification_improvement/${id}`,
    }),
  }),
});

export const { useGetQualificationsQuery, useGetQualificationsIdQuery } =
  qualifications;
