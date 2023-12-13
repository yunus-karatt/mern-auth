import { apiSlice } from "./apiSlice";
const ADMIN_URL = "/api/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminLogin: builder.mutation({
      query: (data) => {
        return {
          url: `${ADMIN_URL}`,
          method: "POST",
          body: data,
        };
      },
    }),
    adminLogout: builder.mutation({
      query: () => {
        return {
          url: `${ADMIN_URL}/logout`,
          method: "POST",
        };
      },
    }),
    getUserData: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/dashboard`,
        method: "GET",
      }),
    }),
    updateUserAccess: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/user/block-unblock/?id=${id}`,
        method: "PUT",
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${ADMIN_URL}/user/delete/?id=${id}`,
        method: "DELETE",
      }),
    }),
    getUpdateUserData:builder.mutation({
      query:(id)=>({
        url:`${ADMIN_URL}/update-user-data/${id}`,
        method:"GET"
      })
    })
    ,
    updateUserData: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/user/update-user/`,
        method: "PUT",
        body:data
      }),
    }),
    addUser:builder.mutation({
      query:(data)=>({
        url:`${ADMIN_URL}/users/add-user`,
        method:"POST",
        body:data
      })
    })
  }),
});
export const {
  useAdminLoginMutation,
  useAdminLogoutMutation,
  useGetUserDataMutation,
  useUpdateUserAccessMutation,
  useDeleteUserMutation,
  useUpdateUserDataMutation,
  useGetUpdateUserDataMutation,
  useAddUserMutation
} = adminApiSlice;
