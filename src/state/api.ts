import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { GetKpisResponse } from "./types";
export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl:'http://localhost:1332'}),
    reducerPath:"api",
    tagTypes:["Kpis"],
    endpoints:builder=>({
        getKpis:builder.query<Array<GetKpisResponse>,void>({
            query: ()=>"kpi/kpis/",
            providesTags: ["Kpis"]
        })
    })
})

export const { useGetKpisQuery } = api;