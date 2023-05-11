import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoApiHeaders = {
  "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
  "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
};

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
    getCryptoDetails: builder.query({
      query: (coinId) => {
        return createApiRequest(`/coin/${coinId}`);
      },
    }),
    getCryptoHistory: builder.query({
      query: ({ coinId, timeperiod }) => {
        return createApiRequest(
          `/coin/${coinId}/history?timePeriod=${timeperiod}`
        );
      },
    }),
  }),
});

export const {
  useGetCryptosQuery,
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} = cryptoApi;
