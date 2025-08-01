// import axiosClient from '@/lib/axios/axiosClient';
// import { TRegisterClientAdminSchema } from '@/lib/validations/_clientSchema';
// import { ClientAdminResponseData } from '@/_types';

// export const clientService = {
//   createClient: async (data: TRegisterClientAdminSchema): Promise<ClientAdminResponseData> => {
//     const formData = new FormData();
    
//     // Add all form fields to FormData
//     Object.entries(data).forEach(([key, value]) => {
//       if (key === 'company_photo' && value instanceof File) {
//         // Add file directly
//         formData.append('company_photo', value);
//       } else if (key === 'product_ids' && Array.isArray(value)) {
//         // Handle array fields - Django DRF expects arrays like this
//         value.forEach((id) => {
//           formData.append('product_ids', id);
//         });
//       } else if (value !== undefined && value !== null) {
//         // Convert other values to string
//         formData.append(key, String(value));
//       }
//     });

//     // Debug: Log FormData contents
//     // console.log('FormData contents:');
//     // for (let [key, value] of formData.entries()) {
//     //   console.log(key, value instanceof File ? `File: ${value.name}` : value);
//     // }

//     try {
//       const response = await axiosClient.post('/clients/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//         // Add upload progress if needed
//         onUploadProgress: (progressEvent) => {
//           const percentCompleted = Math.round(
//             (progressEvent.loaded * 100) / (progressEvent.total || 1)
//           );
//           console.log(`Upload Progress: ${percentCompleted}%`);
//         },
//       });

//       return response.data;
//     } catch (error: any) {
//       console.error('Client creation error:', error.response?.data);
//       throw {
//         status: error?.response?.status || 500,
//         data: error?.response?.data || { message: 'Network error occurred' },
//       };
//     }
//   },

//   updateClient: async (id: string, data: Partial<TRegisterClientAdminSchema>): Promise<ClientAdminResponseData> => {
//     const formData = new FormData();
    
//     Object.entries(data).forEach(([key, value]) => {
//       if (key === 'company_photo' && value instanceof File) {
//         formData.append('company_photo', value);
//       } else if (key === 'product_ids' && Array.isArray(value)) {
//         value.forEach((id) => {
//           formData.append('product_ids', id);
//         });
//       } else if (value !== undefined && value !== null) {
//         formData.append(key, String(value));
//       }
//     });

//     const response = await axiosClient.patch(`/clients/${id}/`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });

//     return response.data;
//   },
// };