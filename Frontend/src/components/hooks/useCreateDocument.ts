import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateDocument } from '../../config/document/documentConfig';

type DocumentData = {
  name: string;
  content: string;
};

export const useCreateDocument = () => {
//  const queryClient = useQueryClient();

  return useMutation<DocumentData, unknown, DocumentData>({
    mutationFn: async (data: DocumentData) => {
      const response = await CreateDocument(data);
      return response; 
    },
    onSuccess: (data) => {
      console.log('Document created successfully:', data);

     
     // queryClient.invalidateQueries(['documents']); // Adjust query key
    },
    onError: (error) => {
      console.error('Error creating document:', error);
    },
  });
};
