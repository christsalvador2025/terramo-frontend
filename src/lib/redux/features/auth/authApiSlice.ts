// import { baseApiSlice } from "@/lib/redux/features/api/baseApiSlice";
// import { 
//     RegisterClientData, 
//     RegisterClientDataResponse,
//     LoginAdminData,
//     LoginTerramoAdminResponse 
// } from "@/types";
// // mutation: (return data, sent to the server)
// export const authApiSlice = baseApiSlice.injectEndpoints({
//     endpoints: (builder)=>({
        
//         registerClient: builder.mutation<RegisterClientDataResponse,RegisterClientData>({
//             query: (clientData) => ({
//                 url: "/clients/",
//                 method: "POST",
//                 body: clientData,
//             })
//         }),
//         loginUser: builder.mutation<LoginTerramoAdminResponse ,LoginAdminData>({
//             query: (credentials) => ({
//                 url: "/authentication/admin/login/",
//                 method: "POST",
//                 body: credentials,
//             })
//         }),
//         logoutUser: builder.mutation<void,void>({
//             query: () => ({
//                 url: "/auth/logout/",
//                 method: "POST"
     
//             })
//         }),
//         refreshJWT: builder.mutation<void,void>({
//             query: () => ({
//                 url: "/auth/refresh/",
//                 method: "POST"
     
//             })
//         }),
//         getCurrentClientAdmin: builder.mutation<void,void>({
//             query: () => ({
//                 url: "/clients/",
//                 method: "POST"
     
//             })
//         }),
//     })
// });

// export const { 
//     useRegisterClientMutation,
//     useLoginUserMutation,
//     useLogoutUserMutation,
//     useRefreshJWTMutation,
    
// } = authApiSlice;


import { baseApiSlice } from "@/lib/redux/features/api/baseApiSlice";
import { 
    RegisterClientData, 
    RegisterClientDataResponse,
    LoginAdminData,
    LoginTerramoAdminResponse 
} from "@/types";

// Add these new interfaces for client admin login
interface LoginLinkRequest {
  email: string;
}

interface LoginLinkResponse {
  message: string;
  success: boolean;
  status: string;
}

interface TokenLoginRequest {
  token: string;
}

interface TokenLoginResponse {
  message: string;
  message_stat: string;
  access: string;
  refresh: string;
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    last_login: string | null;
  };
  client: {
    id: number;
    company_name: string;
    email: string;
  };
}

// mutation: (return data, sent to the server)
export const authApiSlice = baseApiSlice.injectEndpoints({
    endpoints: (builder)=>({
        
        registerClient: builder.mutation<RegisterClientDataResponse,RegisterClientData>({
            query: (clientData) => ({
                url: "/clients/",
                method: "POST",
                body: clientData,
            })
        }),
        loginUser: builder.mutation<LoginTerramoAdminResponse ,LoginAdminData>({
            query: (credentials) => ({
                url: "/authentication/admin/login/",
                method: "POST",
                body: credentials,
            })
        }),
        logoutUser: builder.mutation<void,void>({
            query: () => ({
                url: "/auth/logout/",
                method: "POST"
     
            })
        }),
        refreshJWT: builder.mutation<void,void>({
            query: () => ({
                url: "/auth/refresh/",
                method: "POST"
     
            })
        }),
        getCurrentClientAdmin: builder.mutation<void,void>({
            query: () => ({
                url: "/clients/",
                method: "POST"
     
            })
        }),
        
        // NEW: Client admin login mutations
        requestClientAdminLoginLink: builder.mutation<LoginLinkResponse, LoginLinkRequest>({
            query: (data) => ({
                url: '/clients/client-admin/request-login/',
                method: 'POST',
                body: data,
            }),
        }),

        clientAdminTokenLogin: builder.mutation<TokenLoginResponse, TokenLoginRequest>({
            query: ({ token }) => ({
                url: `/clients/client-admin/login/${token}/`,
                method: 'POST',
            }),
        }),
    })
});

export const { 
    useRegisterClientMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useRefreshJWTMutation,
    // NEW: Export the new hooks
    useRequestClientAdminLoginLinkMutation,
    useClientAdminTokenLoginMutation,
    
} = authApiSlice;