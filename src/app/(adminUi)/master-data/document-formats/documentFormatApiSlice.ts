import { IDocumentFormat, IFetchDocumentFormatsResponse } from "@/models/document-format";
import { Response } from "@/models/Response";
import { apiSlice } from "@/store/apiSlice";

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchDocumentFormats: builder.query<IDocumentFormat[], void>({
      query: () => "documentformats",
      transformResponse: (response: Response<IDocumentFormat[]>, meta, arg) => {
        return response.payload as IDocumentFormat[];
      },
    }),
    fetchDocumentFormatsById: builder.query<IDocumentFormat, string>({
      query: (documentFormatId: string) => `documentformats/${documentFormatId}`,
      transformResponse: (response: Response<IDocumentFormat>, meta, arg) => {
        return response.payload as IDocumentFormat;
      },
    }),
    createDocumentFormat: builder.mutation<IDocumentFormat, Partial<IDocumentFormat>>({
      query: (body) => ({
        url: "documentformats",
        method: "POST",
        body: JSON.stringify(body)
      }),
    }),
    updateDocumentFormat: builder.mutation<void, Partial<IDocumentFormat>>({
      query: (data) => ({
        url: `documentformats/${data.id}`,
        method: "PUT",
        body: JSON.stringify(data),
      })
    }),
    deleteDocumentFormat: builder.mutation<
      { success: boolean; id: string },
      string
    >({
      query(documentFormatId: string) {
        return {
          url: `documentformats/${documentFormatId}`,
          method: "DELETE",
        };
      }
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchDocumentFormatsByIdQuery,
  useFetchDocumentFormatsQuery,
  useCreateDocumentFormatMutation,
  useDeleteDocumentFormatMutation,
  useUpdateDocumentFormatMutation,
} = extendedApi;