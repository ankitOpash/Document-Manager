import AxiosCreator from "../axios.config";

export const CreateDocument = async (data: { name: string; content: string }) => {
  try {
    const response = await AxiosCreator.post('/create-document', data);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};


export const fetchDocuments = async (search?: string) => {
  const response = await AxiosCreator.get('/documents', {
    params: search ? { search } : {}, // Add search as a query parameter if provided
  });
  return response.data;
};

export const fetchDocumentById = async (documentId: string) => {
  const response = await AxiosCreator.get(`/documentbyid/${documentId}`);
  return response.data;
};

export const updateDocument = async (
  id: string,
  data: { name?: string; content?: string } // Name and content are optional
) => {  
  const response = await AxiosCreator.put(`/updatedoc/${id}`, data);
  return response.data;
};


export const deleteDocument = async (id: string) => {
  await AxiosCreator.delete(`/deletedoc/${id}`);
};