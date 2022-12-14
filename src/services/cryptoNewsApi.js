import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const newsApiHeaders = {
   'X-BingApis-SDK': 'true',
   'X-RapidAPI-Key': 'a6b0d6bb58msh3c92c1f9717c5b6p1914f9jsn971db3db9d3a',
   'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}

const baseUrl = 'https://bing-news-search1.p.rapidapi.com';


const createRequest = url => ({ url, headers: newsApiHeaders })

export const newsApi = createApi({
   reducerPath: 'newsApi',
   baseQuery: fetchBaseQuery({ baseUrl }),
   endpoints: builder => ({
      getNews: builder.query({
         query: ({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`)
      })
   })
})

export const { useGetNewsQuery } = newsApi;