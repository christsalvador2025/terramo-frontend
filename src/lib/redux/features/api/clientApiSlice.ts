// lib/redux/features/api/clientApiSlice.ts (Extended version)
import {
  ClientAdminResponseData,
  ClientsResponse,
} from "@/types";
import {
  Products,
  SingleClient,
  Stakeholder,
  Measure,
  StakeholderMeasureGrading
} from "@/_types/clients";
import { baseApiSlice } from "@/lib/redux/features/api/baseApiSlice";
import { TRegisterClientAdminSchema } from "@/lib/validations/_clientSchema";

interface AcceptInvitationResponse {
  success?: boolean;
  message: string;
  message_stat: 'accepted_and_verified' | 'accepted_and_for_verification' | 'invitation_not_found' | 'email_verified';
  action?: 'login' | 'complete_registration' | 'redirect_to_login' | 'contact_support';
  email?: string;
  login_token?: string;
  user_id?: number;
  invitation_id?: number;
  status?: 'already_registered' | 'newly_registered' | 'error';
  redirect_url?: string | null;
  access?: string;
  refresh?: string;
  user?: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
    last_login: string | null;
  };
}

interface AcceptInvitationRequest {
  email: string;
  token: string;
}

const createFormData = (data: TRegisterClientAdminSchema): FormData => {
  const formData = new FormData();
  
  Object.entries(data).forEach(([key, value]) => {
    if (key === 'company_photo') {
      if (value instanceof File) {
        formData.append('company_photo', value);
      }
    } else if (key === 'product_ids') {
      if (Array.isArray(value)) {
        value.forEach((id, index) => {
          formData.append(`product_ids[${index}]`, id);
        });
      }
    } else if (value !== undefined && value !== null) {
      formData.append(key, String(value));
    }
  });
  
  return formData;
};

export const clientApiSlice = baseApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Existing endpoints
    createClient: builder.mutation<ClientAdminResponseData, TRegisterClientAdminSchema>({
      query: (clientData) => {
        const formData = createFormData(clientData);
        
        return {
          url: "/clients/",
          method: "POST",
          body: formData,
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
    
    acceptInvitationByToken: builder.query<AcceptInvitationResponse, { token: string; email?: string }>({
      query: ({ token }) => ({
        url: `/clients/client-admin/accept-invite/${token}/`,
        method: "GET",
      }),
      providesTags: (result, error, { token }) => [{ type: "Invitation", id: token }],
    }),
    
    acceptInvitation: builder.mutation<AcceptInvitationResponse, AcceptInvitationRequest>({
      query: ({ email, token }) => ({
        url: `/clients/client-admin/accept-invite/${token}/`,
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["Invitation", "Client"],
      transformErrorResponse: (response) => {
        return {
          status: response.status,
          data: response.data,
        };
      },
    }),

    loginByToken: builder.query<AcceptInvitationResponse, { token: string }>({
      query: ({ token }) => ({
        url: `/clients/client-admin/login-token/${token}/`,
        method: "GET",
      }),
      providesTags: (result, error, { token }) => [{ type: "LoginToken", id: token }],
    }),

    requestLoginLink: builder.mutation<
      { message: string; success: boolean }, 
      { email: string }>({
      query: ({ email }) => ({
        url: "/clients/client-admin/request-login/",
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["LoginRequest"],
      transformErrorResponse: (response) => {
        return {
          status: response.status,
          data: response.data,
        };
      },
    }),

    // NEW ENDPOINTS FOR DASHBOARD FUNCTIONALITY
    
    // Fetch stakeholders
    fetchStakeholders: builder.query<Stakeholder[], void>({
      query: () => "/stakeholders/",
      providesTags: ["Stakeholders"],
    }),

    // Fetch measures
    fetchMeasures: builder.query<Measure[], void>({
      query: () => "/measures/",
      providesTags: ["Measures"],
    }),

    // Get client's stakeholder measure gradings
    getClientStakeholderMeasureGradings: builder.query<StakeholderMeasureGrading[], string | undefined>({
      query: (clientId) => `/clients/${clientId}/stakeholder-measure-gradings/`,
      providesTags: (result, error, clientId) => [
        { type: "StakeholderGradings", id: clientId }
      ],
      skip: (clientId) => !clientId,
    }),

    // Update client's measure gradings
    updateClientMeasureGradings: builder.mutation<
      any,
      { clientId: string; measureGradings: any[] }
    >({
      query: ({ clientId, measureGradings }) => ({
        url: `/clients/${clientId}/measure-gradings/`,
        method: "PATCH",
        body: { measureGradings },
      }),
      invalidatesTags: (result, error, { clientId }) => [
        { type: "Client", id: clientId },
        { type: "MeasureGradings", id: clientId }
      ],
    }),

    // Update stakeholder selections
    updateStakeholderSelections: builder.mutation<
      any,
      { clientId: string; stakeholderSelections: { stakeholderId: number; chosen: boolean }[] }
    >({
      query: ({ clientId, stakeholderSelections }) => ({
        url: `/clients/${clientId}/stakeholder-selections/`,
        method: "PATCH",
        body: { stakeholderSelections },
      }),
      invalidatesTags: (result, error, { clientId }) => [
        { type: "Client", id: clientId },
        { type: "StakeholderSelections", id: clientId }
      ],
    }),

    // Get client's ESG comments
    getClientEsgComments: builder.query<
      Record<string, string>,
      string
    >({
      query: (clientId) => `/clients/${clientId}/esg-comments/`,
      providesTags: (result, error, clientId) => [
        { type: "EsgComments", id: clientId }
      ],
    }),

    // Update ESG comments
    updateEsgComments: builder.mutation<
      any,
      { clientId: string; comments: Record<string, string> }
    >({
      query: ({ clientId, comments }) => ({
        url: `/clients/${clientId}/esg-comments/`,
        method: "PATCH",
        body: { comments },
      }),
      invalidatesTags: (result, error, { clientId }) => [
        { type: "EsgComments", id: clientId }
      ],
    }),

    // Dual Essentiality related endpoints
    getClientDualEssentialityData: builder.query<any, string>({
      query: (clientId) => `/clients/${clientId}/dual-essentiality/`,
      providesTags: (result, error, clientId) => [
        { type: "DualEssentiality", id: clientId }
      ],
    }),

    updateDualEssentialityStep: builder.mutation<
      any,
      { clientId: string; step: number; data: any }
    >({
      query: ({ clientId, step, data }) => ({
        url: `/clients/${clientId}/dual-essentiality/step/${step}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (result, error, { clientId }) => [
        { type: "DualEssentiality", id: clientId }
      ],
    }),
  }),
});

export const {
  // Existing hooks
  useCreateClientMutation,
  useGetAllClientsQuery,
  useGetClientByIdQuery,
  useUpdateClientMutation,
  useDeleteClientMutation,
  useGetProductsQuery,
  useAcceptInvitationByTokenQuery,
  useLazyAcceptInvitationByTokenQuery,
  useAcceptInvitationMutation,
  useLoginByTokenQuery,
  useLazyLoginByTokenQuery,
  useRequestLoginLinkMutation,

  // New dashboard hooks
  useFetchStakeholdersQuery,
  useFetchMeasuresQuery,
  useGetClientStakeholderMeasureGradingsQuery,
  useUpdateClientMeasureGradingsMutation,
  useUpdateStakeholderSelectionsMutation,
  useGetClientEsgCommentsQuery,
  useUpdateEsgCommentsMutation,
  useGetClientDualEssentialityDataQuery,
  useUpdateDualEssentialityStepMutation,
} = clientApiSlice;