import { IDocumentType, IFetchDocumentTypeResponse, SubmitIDocumentType } from "../../../../models/document-type";
import { Response } from "../../../../models/Response";
import { apiSlice } from "../../../../store/apiSlice";

const extendAPi = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        fetchDocumentType : builder.query<IDocumentType[], void>({
           query: () => "documentTypes",
           transformResponse: (response: Response<IDocumentType[]>, meta, arg) =>{
             return response.payload as IDocumentType[];
           },
        }),
        fetchDocumentTypeById: builder.query<IDocumentType, string>({
         query : (documentTypeId: string) => `documenttype/${documentTypeId}`,
         transformResponse: (response: Response<IDocumentType>, meta, arg) =>{
            return response.payload;
         },   
        }),
        createDocumentType: builder.mutation<SubmitIDocumentType, Partial<SubmitIDocumentType>>({
         query: (body) =>({
            url: "documenttypes",
            method: "POST",
            body: JSON.stringify(body)
         })
        }),
        updateDocumentType: builder.mutation<void, Partial<SubmitIDocumentType>>({
            query: (data) =>({
                url: `documenttypes/${data.id}`,
                method: "PUT",
                body: JSON.stringify(data),
            })
        }),
        deleteDocumentType: builder.mutation<{success: boolean; id: string}, string>({
            query: (documentTypeId) =>({
                url: `documenttypes/${documentTypeId}`,
                method: "DELETE"
            })
        })
    }),
    overrideExisting: false,
});

export const {
    useFetchDocumentTypeQuery,
    useFetchDocumentTypeByIdQuery,
    useCreateDocumentTypeMutation,
    useDeleteDocumentTypeMutation,
    useUpdateDocumentTypeMutation,
} = extendAPi;