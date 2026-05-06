import { apiSlice } from "./base-query";
import { RegisterPayload, ForgotPasswordPayload, User, LoginPayload } from "@/types/user";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ data: { user: User; token: string } }, LoginPayload>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
    }),

    register: builder.mutation<{ data: { user: User } }, RegisterPayload>({
      query: (body) => ({
        url: "/auth/register",
        method: "POST",
        body,
      }),
    }),

    forgotPassword: builder.mutation<void, ForgotPasswordPayload>({
      query: (body) => ({
        url: "/password/reset",
        method: "POST",
        body,
      }),
    }),

    // 3. UPDATE PROFILE (dengan Image Upload)
    updateProfile: builder.mutation<User, FormData>({
      query: (formData) => ({
        url: "/me?_method=PUT",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useUpdateProfileMutation,
} = authApi;
