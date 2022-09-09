import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const moviesApi = createApi({
  reducerPath: "moviesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:9000" }),
  tagTypes: ["Movie"],
  endpoints: (builder) => ({
    movies: builder.query({
      query: () => ({
        url: "/movies/",
        method: "GET",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        providesTags: ["Movie"],
      }),
    }),
    movie: builder.query({
      query: (movieId) => ({
        url: `/movies/${movieId}`,
        method: "GET",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        providesTags: ["Movie"],
      }),
    }),
    addMovie: builder.mutation({
      query: (movie) => ({
        url: "/movies",
        method: "POST",
        body: movie,
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
      invalidatesTags: ["Movie"],
    }),
    deleteMovie: builder.mutation({
      query: (movieId) => ({
        url: `/movies/${movieId}`,
        method: "DELETE",
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
      invalidatesTags: ["Movie"],
    }),
    updateMovie: builder.mutation({
      query: ({ movieId, ...movieUpdate }) => ({
        url: `/movies/${movieId}`,
        method: "PATCH",
        body: movieUpdate,
        headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
      invalidatesTags: ["Movie"],
    }),
  }),
});

export const {
  useMovieQuery,
  useAddMovieMutation,
  useDeleteMovieMutation,
  useMoviesQuery,
  useUpdateMovieMutation,
} = moviesApi;
