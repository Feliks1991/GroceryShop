import { baseApi } from "@/shared";
import type Product from "@/app/store/ProductType";

type Comment = Pick<Product, "comments" | "rating">;

const commentsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getComments: build.query<Comment, { category: string; SKU: string }>({
      query: ({ category, SKU }) => ({
        url: `comments/${category}/${SKU}`,
      }),
      providesTags: (_result, _error, { category, SKU }) => [
        { type: "Comments", id: `${category}_${SKU}` },
      ],
    }),

    addComment: build.mutation<
      Product["comments"],
      { category: string; SKU: string; commentData: { comment: string; rating: number } }
    >({
      query: ({ category, SKU, commentData }) => ({
        method: "POST",
        url: `comments/${category}/${SKU}`,
        data: commentData,
      }),
      invalidatesTags: (_result, _error, { category, SKU }) => [
        { type: "Comments", id: `${category}_${SKU}` },
      ],
    }),

    editcomment: build.mutation<
      Product["comments"],
      { category: string; id: string; commentData: { comment: string; rating: number } }
    >({
      query: ({ category, id, commentData }) => ({
        method: "PATCH",
        url: `comments/${category}/${id}`,
        data: commentData,
      }),
      invalidatesTags: (_result, _error, { category, id }) => [
        { type: "Comments", id: `${category}_${id.split("-")[0]}` },
      ],
    }),

    deleteComment: build.mutation<Product["comments"], { category: string; id: string }>({
      query: ({ category, id }) => ({
        method: "DELETE",
        url: `comments/${category}/${id}`,
      }),
      invalidatesTags: (_result, _error, { category, id }) => [
        { type: "Comments", id: `${category}_${id.split("-")[0]}` },
      ],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useDeleteCommentMutation,
  useAddCommentMutation,
  useEditcommentMutation,
} = commentsApi;
