import { AUTH_KEY } from "@/constants/cookieKeys";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookie } from "cookies-next";

const getToken = async () => {
  const currentAuth = getCookie(AUTH_KEY)?.toString();

  if (currentAuth) {
    // const session = currentAuth || "";
    return JSON.parse(currentAuth)?.accessToken || "";
  }

  return '';
};

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://invearn2-coreapi-dev.azurewebsites.net/api/",
    prepareHeaders: async (headers, { getState }) => {
      const token = await getToken();
      console.log(token)
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["OrganisationTypes", "DepartmentModel", "UnitModel", "IRegistrarTableData","UserRoles", "Users"],
  endpoints: (builder) => ({}),
});
