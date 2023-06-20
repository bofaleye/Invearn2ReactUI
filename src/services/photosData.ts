import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Photos {
  albumId: Number;
  id: Number;
  title: String;
  url: string;
  thumbnailUrl: string;
}

export const photosApi = createApi({
  reducerPath: "photosApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),

  endpoints: (builder) => ({
    photos: builder.query<Photos[], void>({
      query: () => "/photos",
    }),
  }),
});

export const { usePhotosQuery } = photosApi;
