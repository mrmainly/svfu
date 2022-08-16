import { api } from "./api";

export const direction = api.injectEndpoints({
  endpoints: (build) => ({
    getDirection: build.query({
      query: () => `tester/direction/`,
      providesTags: ["Direction"],
    }),
    postDirection: build.mutation({
      query(body) {
        return {
          url: `tester/application/`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: [{ type: "Direction" }],
    }),
  }),
});

export const { useGetDirectionQuery, usePostDirectionMutation } = direction;
