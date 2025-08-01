import { baseApiSlice } from "@/lib/redux/features/api/baseApiSlice";
import { 
    RegisterClientData, 
    RegisterClientDataResponse,
    LoginAdminData,
    LoginTerramoAdminResponse 
} from "@/types";
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
    })
});

export const { 
    useRegisterClientMutation,
    useLoginUserMutation,
    useLogoutUserMutation,
    useRefreshJWTMutation,
    
} = authApiSlice;