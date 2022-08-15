import { api } from "./api";

export const documents = api.injectEndpoints({
  endpoints: (build) => ({
    getDocuments: build.query({
      query: () => `users/document/`,
      providesTags: ["Document"],
    }),
    postDocuments: build.mutation({
      query({ formData }) {
        return {
          url: `users/document/`,
          method: "POST",
          body: formData,
          header: "multipart/form-data",
        };
      },
      invalidatesTags: [{ type: "Document" }],
    }),
    postDocumentsDiploma: build.mutation({
      query({ formData }) {
        return {
          url: `users/document/diploma`,
          method: "POST",
          body: formData,
          header: "multipart/form-data",
        };
      },
      invalidatesTags: [{ type: "Document" }],
    }),
    // patchDocuments: build.mutation({
    //   query({ id, formData }) {
    //     return {
    //       url: `users/qualification_improvement/${id}`,
    //       method: "PATCH",
    //       body: formData,
    //     };
    //   },
    //   invalidatesTags: [{ type: "Qualification" }],
    // }),

  }),
});

export const {
  useGetDocumentsQuery,
  usePostDocumentsMutation,
  usePostDocumentsDiplomaMutation,
} = documents;
