import { api } from "./api";

export const qualifications = api.injectEndpoints({
  endpoints: (build) => ({
    getQualifications: build.query({
      query: () => `users/qualification_improvement/`,
    }),
  }),
});

export const { useGetQualificationsQuery } = qualifications;
