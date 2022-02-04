import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type PostRequest = {
  title: string
  body: string
  userId: number
}

type PostResponse = {
  id: number
  title: string
  body: string
  userId: number
}

export const postApi = createApi({
  reducerPath: 'postApi',
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  endpoints: (builder) => ({
    getPosts: builder.query<PostResponse[], number>({
      query: (_limit) => `posts?_page=3&_limit=${_limit}`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
              { type: 'Posts', id: 'LIST' },
            ]
          : [{ type: 'Posts', id: 'LIST' }],
    }),
    getPostsById: builder.query<number, string>({
      query: (id) => `posts/${id}`,
    }),
    creatingResource: builder.mutation<PostResponse, PostRequest>({
      query: (body) => ({
        url: 'posts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
    deleteResource: builder.mutation<any, number>({
      query: (id) => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetPostsQuery,
  useGetPostsByIdQuery,
  useCreatingResourceMutation,
  useDeleteResourceMutation,
} = postApi
