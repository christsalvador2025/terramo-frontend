// import {
//   ClientAdminData,
//   ClientAdminResponseData,
//   ClientsResponse,
// } from "@/_types";
// import {
//   Products,
//   ClientProduct,
//   LatestInvitation,
//   SingleClient
// } from "@/types/clients";
// import { baseApiSlice } from "@/lib/redux/features/api/baseApiSlice";


// import {
//   ClientAdminResponseData,
//   ClientsResponse,
// } from "@/_types";
// import {
//   Products,
//   SingleClient
// } from "@/_types/clients";
// import { baseApiSlice } from "@/lib/redux/features/api/baseApiSlice";
// import { TRegisterClientAdminSchema } from "@/lib/validations/_clientSchema";

// // Helper function to convert form data to FormData for file upload
// const createFormData = (data: TRegisterClientSchema): FormData => {
//   const formData = new FormData();
  
//   // Add all text fields
//   Object.entries(data).forEach(([key, value]) => {
//     if (key === 'company_photo') {
//       // Handle file separately
//       if (value instanceof File) {
//         formData.append('company_photo', value);
//       }
//     } else if (key === 'product_ids') {
//       // Handle array fields
//       if (Array.isArray(value)) {
//         value.forEach((id, index) => {
//           formData.append(`product_ids[${index}]`, id);
//         });
//       }
//     } else if (value !== undefined && value !== null) {
//       // Handle other fields
//       formData.append(key, String(value));
//     }
//   });
  
//   return formData;
// };

// export const clientApiSlice = baseApiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     createClient: builder.mutation<ClientAdminResponseData, ClientAdminData>({
//       query: (clientData) => ({
//         url: "/clients/",
//         method: "POST",
//         body: clientData,
//       }),
//       invalidatesTags: ["Client"],
//       transformErrorResponse: (response) => {
//         // Transform API errors to a consistent format
//         return {
//           status: response.status,
//           data: response.data,
//         };
//       },
//     }),
//     getAllClients: builder.query<ClientsResponse, void>({
//       query: () => ({
//         url: "/clients/",
//         method: "GET",
//       }),
//       providesTags: ["Client"],
//     }),
//     getClientById: builder.query<SingleClient, string>({
//       query: (id) => ({
//         url: `/clients/${id}`,
//         method: "GET",
//       }),
//       providesTags: (result, error, id) => [{ type: "Client", id }],
//     }),
//     updateClient: builder.mutation<ClientAdminResponseData, { id: string; data: Partial<ClientAdminData> }>({
//       query: ({ id, data }) => ({
//         url: `/clients/${id}`,
//         method: "PATCH",
//         body: data,
//       }),
//       invalidatesTags: (result, error, { id }) => [{ type: "Client", id }, "Client"],
//     }),
//     deleteClient: builder.mutation<void, string>({
//       query: (id) => ({
//         url: `/clients/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: ["Client"],
//     }),
//     getProducts: builder.query<Products[], void>({
//       query: () => "/products/",
//       providesTags: ["Products"],
//     }),
//     uploadClientPhoto: builder.mutation<{ url: string }, FormData>({
//       query: (formData) => ({
//         url: "/upload/client-photo",
//         method: "POST",
//         body: formData,
//       }),
//     }),
//   }),
// });

// export const {
//   useCreateClientMutation,
//   useGetAllClientsQuery,
//   useGetClientByIdQuery,
//   useUpdateClientMutation,
//   useDeleteClientMutation,
//   useGetProductsQuery,
//   useUploadClientPhotoMutation,
// } = clientApiSlice;





import {
  ClientAdminResponseData,
  ClientsResponse,
} from "@/types";
import {
  Products,
  SingleClient
} from "@/_types/clients";
import { baseApiSlice } from "@/lib/redux/features/api/baseApiSlice";
import { TRegisterClientAdminSchema } from "@/lib/validations/_clientSchema";

// Helper function to convert form data to FormData for file upload
const createFormData = (data: TRegisterClientAdminSchema): FormData => {
  const formData = new FormData();
  
  // Add all text fields
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'company_photo') {
      // Handle file separately
      if (value instanceof File) {
        formData.append('company_photo', value);
      }
    } else if (key === 'product_ids') {
      // Handle array fields
      if (Array.isArray(value)) {
        value.forEach((id, index) => {
          formData.append(`product_ids[${index}]`, id);
        });
      }
    } else if (value !== undefined && value !== null) {
      // Handle other fields
      formData.append(key, String(value));
    }
  });
  
  return formData;
};

export const clientApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createClient: builder.mutation<ClientAdminResponseData, TRegisterClientAdminSchema>({
      query: (clientData) => {
        const formData = createFormData(clientData);
        
        return {
          url: "/clients/",
          method: "POST",
          body: formData,
          // Don't set Content-Type header - let the browser set it with boundary for multipart
        };
      },
      invalidatesTags: ["Client"],
      transformErrorResponse: (response) => {
        return {
          status: response.status,
          data: response.data,
        };
      },
    }),
    
    getAllClients: builder.query<ClientsResponse, void>({
      query: () => ({
        url: "/clients/",
        method: "GET",
      }),
      providesTags: ["Client"],
    }),
    
    getClientById: builder.query<SingleClient, string>({
      query: (id) => ({
        url: `/clients/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Client", id }],
    }),
    
    updateClient: builder.mutation<ClientAdminResponseData, { id: string; data: Partial<TRegisterClientAdminSchema> }>({
      query: ({ id, data }) => {
        const formData = createFormData(data as TRegisterClientAdminSchema);
        
        return {
          url: `/clients/${id}`,
          method: "PATCH",
          body: formData,
        };
      },
      invalidatesTags: (result, error, { id }) => [{ type: "Client", id }, "Client"],
    }),
    
    deleteClient: builder.mutation<void, string>({
      query: (id) => ({
        url: `/clients/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Client"],
    }),
    
    getProducts: builder.query<Products[], void>({
      query: () => "/products/",
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useCreateClientMutation,
  useGetAllClientsQuery,
  useGetClientByIdQuery,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useGetProductsQuery,
} = clientApiSlice;