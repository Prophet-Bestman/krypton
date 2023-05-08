import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
  "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
};

// console.log("API KEY:", import.meta.env.VITE_RAPID_API_KEY);
console.log("MODE:", import.meta.env.BASE_URL);

const baseUrl = "https://coinranking1.p.rapidapi.com";

const createApiRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: "CryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptos: builder.query({
      query: (count) => {
        return createApiRequest(`/coins?limit=${count || 100}`);
      },
    }),
  }),
});

export const { useGetCryptosQuery } = cryptoApi;
